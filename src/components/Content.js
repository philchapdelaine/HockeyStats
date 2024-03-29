import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../App.css';
import Standings from './Standings';
import Skaters from './Skaters';
import Today from './Today';
import Canadiens from './Canadiens';
import Fantasy from './Fantasy';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

const Content = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    return (
        <div className='content-container'>
            <div className='tabs'>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    centered 
                    TabIndicatorProps={{
                        style: { background: "red"}
                     }}
                >
                    <Tab label="Today" />
                    <Tab label="Standings" />
                    <Tab label="Skaters" />
                    <Tab label="Goalies" />
                    <Tab label="Canadiens" />
                    <Tab label="Fantasy" />
                </Tabs>
            </div>
                <TabPanel value={value} index={0}>
                    <Today />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Standings />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Skaters />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Item Three
                </TabPanel> 
                <TabPanel value={value} index={4}>
                    <Canadiens />
                </TabPanel>    
                <TabPanel value={value} index={5}>
                    <Fantasy />
                </TabPanel>       
        </div>
    )
}

export default Content