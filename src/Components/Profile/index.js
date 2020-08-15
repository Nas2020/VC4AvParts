import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { Card, Box,ToastMessage, Flex, Loader, Button} from 'rimble-ui';
import Nav from '../Nav';
import Footer from '../Footer';


const Profile =  (props) => {

    const [orgName, setOrgName] = useState("");
    const [networkName, setNetworkName] = useState("");
    const [tenantid, setTenantid] = useState("");
    const [issuerDid, setIssuerDid] = useState("");
    const [connLength, setConnLength] = useState(null);
    const [numCredDef, setNumCredDef] = useState(null);
    const [numWallets, setNumWallets] = useState(null);
    const [numSchema, setNumSchema] = useState(null);
    const [numVerifications, setNumVerifications] = useState(null);
    const [numVerificationspolicy, setNumVerificationspolicy] = useState(null);
    const [loader, setLoader] = useState(false);
    console.log(props);
    console.log(props.location);
    console.log(props.location.state.tenantId);
    let history = useHistory();

    let tenantId = props.location.state.tenantId;
    useEffect(() => {
        async function handlePageLoad() {
          
           
            await axios.get('/api/organizations/' + tenantId).then((result_1)=>{
                
                setOrgName(result_1.data.name);
                setTenantid(result_1.data.tenantId);
                setNetworkName(result_1.data.network.networkName);
                setIssuerDid(result_1.data.extendedInformation.issuerDid);
                
               });
        
            await axios.get (`/api/organizations/${tenantId}/keys`).then((result_2)=>{
                console.log(result_2);
                
            });

            await axios.get('/api/listallconnections').then((result_3)=>{
                    let connections = result_3.data;
                    console.log(connections);
                    console.log(result_3);
                    setConnLength(connections.length);
                    
                 });
            await axios.get('/api/listallwallets').then((result_4)=>{
                    console.log(result_4.data);
                    let wallets = result_4.data;
                    setNumWallets(wallets.length);
                    
            })

            //list all Credential Defenition
            await axios.get ('/api/listallcredentialdef').then ((result_5)=>{
                console.log(result_5.data);
                setNumCredDef(result_5.data.length);
                
            })
            //List all SCHEMAS

            await axios.get('/api/listallschemas').then ((result_6)=>{
                setNumSchema(result_6.data.length);
                
            })

            await axios.get('/api/listallverification').then ((result_7)=>{
                console.log(result_7.data);
                setNumVerifications(result_7.data.length);
                setLoader(true);
            })
            


            await axios.get('/api/listallverificationpolicy').then ((result_8)=>{
                console.log(result_8.data);
                setNumVerificationspolicy(result_8.data.length);
                setLoader(true);
            })
        }

        handlePageLoad();
      });

      function logout (){
          history.push('/login');
      }

      function issuecert () {
          history.push('/issuecert', {tenantId:tenantId});
      }

    return (<div><Nav />
                <ToastMessage 
                message={"Hi, Welcome."} 
                secondaryMessage={`This is ${orgName}'s profile section!`}
                icon={"Mood"} 
                my={3} />
                <Card width={"auto"} maxWidth={"800px"} mx={"auto"} px={[3, 3, 4]}>
                <Button.Outline onClick = {issuecert} >Issue Cert</Button.Outline>
                <Button.Outline onClick = {logout} variant = "danger" style = {{float: "right"}} >Logout</Button.Outline>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Organisation Name
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                    {loader ? `${orgName}` : <Loader /> }
                    </Box>
                    
                </Flex>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Network on
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                    {loader ? `${networkName}` : <Loader /> }
                    </Box>
                </Flex>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Tenant ID
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                     {loader ? `${tenantid}` : <Loader /> }
                    </Box>
                </Flex>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Issuer DID
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                     {loader ? `${issuerDid}` : <Loader /> }
                    </Box>
                </Flex>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Number of Connections created
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                     {loader ? `${connLength}` : <Loader /> }
                    </Box>
                </Flex>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Number of Wallets available
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                     {loader ? `${numWallets}` : <Loader /> }
                    </Box>
                </Flex>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Number of Credential Definition created
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                     {loader ? `${numCredDef}` : <Loader /> }
                    </Box>
                </Flex>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Number of schemas created
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                     {loader ? `${numSchema}` : <Loader /> }
                    </Box>
                </Flex>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Number of verifications
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                     {loader ? `${numVerifications}` : <Loader /> }
                    </Box>
                </Flex>
                <Flex>
                    <Box p={3} width={1 / 2} color="salmon" bg="black">
                    Number of verifications policies
                    </Box>
                    <Box p={3} width={1 / 2} color="white" bg="salmon">
                     {loader ? `${numVerificationspolicy}` : <Loader /> }
                    </Box>
                </Flex>
                </Card>
                <Footer />
            </div>)

}

export default Profile;

