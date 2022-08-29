import { database } from './fb';
import {
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  runTransaction,
} from 'firebase/firestore';

export const filterData = [
  { name: 'Café', image: require('../assets/coffe_200.png'), id: '0' },
  {
    name: 'Sandwichs',
    image: require('../assets/sandwich_200.png'),
    id: '1',
  },
  {
    name: 'Confitería',
    image: require('../assets/chocolate_cones_200.png'),
    id: '2',
  },
  {
    name: 'Cápsulas',
    image: require('../assets/coffe_capsules_200.png'),
    id: '3',
  },
  {
    name: 'Accesorios',
    image: require('../assets/expresso_200.png'),
    id: '4',
  },
];

export const getProducts = async () => {
  try {
    const productsSnapshot = await getDocs(collection(database, 'products'));
    let products = [];
    productsSnapshot.forEach((product) =>
      products.push({ id: product.id, ...product.data() })
    );
    return products;
  } catch (ex) {
    console.log(ex);
  }
};
export const getOrders = async (user) => {
  try {
    const usersRef = collection(database, 'orders');
    const q = query(usersRef, where('userId', '==', user.uid));
    const docs = await getDocs(q);
    let orders = [];
    docs.docs.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    return orders.sort((a, b) => b.timestamp - a.timestamp);
  } catch (ex) {
    console.log(ex);
  }
};

export const createAccount = async (user, accountInfo) => {
  try {
    const usersRef = collection(database, 'users');
        await addDoc(usersRef, accountInfo);
  } catch (ex) {
    console.log(ex);
  }
};

export const searchAccount = async (user) => {
    const usersRef = collection(database, 'users');
    const q = query(usersRef, where('userId', '==', user.uid));
    const docs = await getDocs(q);
    if(docs.docs.length > 0){
        const doc = docs.docs.pop();
        return {id: doc.id, ...doc.data()} 
    }else{
        return {email: user.email};
    }
}

export const updateAccount = async (user, accountInfo) => {
    try{
       const usersRef = collection(database, 'users');
    const q = query(usersRef, where('userId', '==', user.uid));
    const docs = await getDocs(q);
    let users = [];
    docs.docs.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    if(users.length > 0){
        console.log(JSON.stringify(users))
        const userToUpdate = users.pop();
        const userInfoRef = doc(database, 'users', userToUpdate.id);
        updateDoc(userInfoRef, {...accountInfo, userId: user.uid});
    }else {

        await addDoc(usersRef, {...accountInfo, userId: user.uid});
    } 
        return {result: 'ok'}
    }catch(ex){
        return {result: 'error'}
    }
    
}

export const purchaseCart = async (user, cart) => {
  try {
    if (cart.products.length === 0) return { result: 'empty' };
    let outOfStock = [];
    let result = 'ok';
    await runTransaction(database, async (transaction) => {
      const products = await getDocs(collection(database, 'products'));
      cart.products.forEach((cartProduct) => {
        const foundProduct = products.docs.find(
          (product) => product.id === cartProduct.productId
        );
        console.log('found ', foundProduct);
        if (foundProduct) {
          const data = { ...foundProduct.data() };
          if (data.available - cartProduct.quantity < 0) {
            outOfStock.push({ id: foundProduct.id, ...data });
          }
        } else {
          throw { msg: 'invalid product' };
        }
      });
      if (outOfStock.length === 0) {
        cart.products.forEach((cartProduct) => {
          const docRef = doc(database, 'products', cartProduct.productId);
          const foundProduct = products.docs.find(
            (product) => product.id === cartProduct.productId
          );
          const data = { ...foundProduct.data() };
          updateDoc(docRef, {
            available: data.available - cartProduct.quantity,
          });
        });
        await addDoc(collection(database, 'orders'), {
          ...cart,
          userId: user.uid,
          timestamp: Date.now(),
        });
      } else {
        throw { msg: 'out of stock' };
      }
    }).catch((err) => {
      result = 'outOfStock';
      console.log(err);
    });

    return { result: result, outOfStock: outOfStock };
  } catch (ex) {
    console.log(ex);
  }
};
