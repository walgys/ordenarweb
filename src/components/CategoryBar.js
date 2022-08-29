import * as React from 'react';
import Box from '@mui/material/Box';
import { Avatar, makeStyles } from '@mui/material';
import { filterData } from '../global/data';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { colors } from '../global/styles';

export default function CategoryBar(props) {
  
  const {categoryIndex, setCategoryIndex} = props;

  const handleChange = (event, newCategoryIndex) => {
    setCategoryIndex(newCategoryIndex);
  };

  return (
    <Box sx={{  bgcolor: '#EFEFEF', justifyContent: 'center', width: '100%', display: 'flex'}}>
      <Tabs
        value={categoryIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="scrollable prevent tabs example"
      >
        
        {filterData.map(category=> <Tab key={category.id} label={category.name} icon={<Avatar src={category.image}/>} />)}
       
       
        </Tabs>
    </Box>
  );
}