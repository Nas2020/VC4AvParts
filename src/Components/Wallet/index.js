import React, { useState } from 'react';
import axios from 'axios';
import { Card, Box, Button, Form, Field, Loader, Flash, Input } from 'rimble-ui';
const Wallet = () => {


    const tenantId = "cdbfXn6LxSWYttQ8XApjckCKuJWyYfOh";//singapore airline now

    const[walletId, setWalletId] = useState("");
    const[connectionId, setConnectionId] = useState("");
    const[credentialId, setCredentialId] = useState("");

    const[loader, setLoader] = useState(true);
    const[status, setStatus] = useState(false);

    const[loader_1, setLoader_1] = useState(true);
    const[status_1, setStatus_1] = useState(false);

const getwalletId = (e) => {
    setWalletId(e.target.value);
}

const getConnectionId = (e) => {
    setConnectionId(e.target.value);
}

const listallCredential = async (e) => {
    e.preventDefault();
    setLoader(false);
        //To set accesstoken on backend
    await axios.get (`/api/organizations/${tenantId}/keys`).then((result_2)=>{
        console.log(result_2);
});

    await axios.get (`/api/${walletId}/credentials/connection/${connectionId}`).then((result)=>{
    setLoader(true);
    console.log(result);
    setStatus(true);
    console.log(result.data);
})

}


const getCredentialId = (e) => {
    setCredentialId(e.target.value);
}

const acceptCredential = async (e) => {
    e.preventDefault();

    setLoader(false);
    //To set accesstoken on backend
    await axios.get (`/api/organizations/${tenantId}/keys`).then((result_2)=>{
    console.log(result_2);
});
    await axios.post (`/api/${walletId}/credentials/${credentialId}`).then((result)=>{
    setLoader_1(true);
    console.log(result);
    setStatus_1(true);
    console.log(result.data);
})

}
    return ( <div>
         <Card width={"auto"} maxWidth={"420px"} mx={"auto"} px={[3, 3, 4]}>
             {status ? (
                 <Flash my={3} variant="success">
                                Success!  
                 </Flash>
               

             ): (

                <Form onSubmit={listallCredential} >
                <Flash my={3} variant="info">
                    Listing of all the credential in this WalletId : 
                    {walletId}
                </Flash>
                <Box px ={3}>
                    <Field label = "Wallet-ID" width={1}>
                        <Input  
                            type = "text"
                            required
                            onChange = {getwalletId}
                            width={1}
                            />
                    </Field>
                </Box>
                <Box px ={3}>
                    <Field label = "Connection-ID" width={1}>
                        <Input  
                            type = "text"
                            required
                            onChange = {getConnectionId}
                            width={1}
                            />
                    </Field>
                </Box>
                <Box>
                    { !loader ? <Loader color="red" size="40px"/> : ( <Button type="submit" >
                    List Credentials
                    </Button>)}   
                 </Box>
            </Form>
    
        
             )}
           
           </Card>



<Card width={"auto"} maxWidth={"420px"} mx={"auto"} px={[3, 3, 4]}>
{status_1 ? (
    <Flash my={3} variant="success">
                   Success!  
    </Flash>
  

): (

   <Form onSubmit={acceptCredential} >
   <Flash my={3} variant="info">
       Accept credential by credentialId: 
       {walletId}
   </Flash>
   <Box px ={3}>
       <Field label = "Wallet-ID" width={1}>
           <Input  
               type = "text"
               required
               onChange = {getwalletId}
               width={1}
               />
       </Field>
   </Box>
   <Box px ={3}>
       <Field label = "Credential-ID" width={1}>
           <Input  
               type = "text"
               required
               onChange = {getCredentialId}
               width={1}
               />
       </Field>
   </Box>
   <Box>
       { !loader_1 ? <Loader color="red" size="40px"/> : ( <Button type="submit" >
       Accept Credentials
       </Button>)}   
    </Box>
</Form>


)}

</Card>
</div>
            
            )
}

export default Wallet;
