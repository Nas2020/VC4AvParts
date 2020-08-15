import React from 'react';
import logo from './logo_VC4AvParts.png';
import './Admin.css';
import { Card, Heading, Flex } from 'rimble-ui';

const Nav = () => {

    return (
        <Flex>
        <Card width={"auto"} maxWidth={"1000px"} mx={"auto"} px={[3, 3, 4]} style={{float:'center'}} >
             <img src={logo} className="App-logo" alt="logo" style={{width:'100px', height:'100px'}}/>
             <Heading as={"h1"} style={{color:"grey", float:'right'}} >Verifiable Credential For Aviation Parts
             </Heading>
        </Card>
        </Flex>

    );
}

export default Nav;