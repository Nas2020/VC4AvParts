import React from 'react';
import logo from './uasystemslogo.png';
import { Card, Heading, Flex } from 'rimble-ui';

const Nav = () => {

    return (
        <Flex>
        <Card width={"100%"}  mx={"auto"} px={[3, 3, 4]} >
             <Heading as={"h6"} style={{color:"grey", textAlign: "center"}} > Copyright © 2020 VC4AvParts all rights reserved. Powered by nlm UA-systems.
             <img src={logo} className="App-logo" alt="logo" style={{width:'25px', height:'30px'}}/>
             </Heading>
             
        </Card>
        </Flex>

    );
}

export default Nav;