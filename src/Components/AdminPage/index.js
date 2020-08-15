import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Datatable from './datatable';
import { Button,Box, Flex, ToastMessage } from 'rimble-ui';
import { useHistory, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo_VC4AvParts.png';



const AdminPage = () => {

    const [data, setData] = useState([]);
    const [q, setQ] = useState('');
    const history = useHistory();
    
    useEffect( () => {
      async function refreshOrganizations(q) {
      let response = await axios.get('/api/organizations');
      console.log(response.data);
      setData (response.data);
      }
      refreshOrganizations(q);
      }, [q])
    
    function logout() {
      history.push('./login');
    }
   
    const onboard = () => {

        history.push ('/onboarding');
    }

    return ( <div>
       
             <Router >
            
            <Flex>
                <img src={logo}  alt="logo" style={{width:'100px', height:'100px'}}/>
                <Box p={3} width={1 / 2} color="white" bg="white" alignItems ="center">
              
              <ToastMessage
                    message={"Welcome Admin!"}
                    secondaryMessage={"You can Add or Remove organisation here. Onbaorded organisations are listed below."}
                    icon={"InfoOutline"} >  </ToastMessage>
              </Box>
              <Box p={3} width={1 / 4} color="white" bg="white">
               <Button.Outline onClick = {onboard}>+ Add Organization</Button.Outline>
              </Box>
              <Box p={3} width={1 / 8} color="white" bg="white">
              <Button.Outline onClick = {logout} variant = "danger">Logout</Button.Outline>
              </Box>
          </Flex>
          
           
          <Datatable data = {data} />
          </Router>
</div>
    );
}

export default AdminPage;