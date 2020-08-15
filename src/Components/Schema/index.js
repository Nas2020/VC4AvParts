import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Box,
    Form,
    Input,
    Field,
    Button,
    Flex,
    Card,
    Text,
    Flash,
    Loader
  } from "rimble-ui";

  //"{"name":"CAAS(AW)95","version":"1.0","attributes":["OrgName","Work Status","Serial No","Part No","Work Order","Form Tracking Number"]}"
  //schemaId: {body: "39UCbsoYnAppGDcSVsufJz:2:CAAS(AW)95:1.0"}

  //CAAS
  //config: {url: "/api/createSchema", method: "post", data: "{"name":"CAAS(AW)95","version":"1.0","attributes":…","Part No","Work Order","Form Tracking Number"]}", headers: {…}, transformRequest: Array(1), …}
// schemaId: {body: "R7oAXZveSniRwfX6mM98ho:2:CAAS(AW)95:1.0"}

const Schema = () => {

    const tenantId = "bZmyk4AfLztPZGNI2Dzlq7vGSp9kLD5J";//CAAS now

    const [loader, setLoader] = useState(true);
    const [status, setStatus] = useState(false);
    const [workstatus, setWorkStatus] = useState("");
    const [serialno, setSerialNo] = useState("");
    const [partno, setPartNo] = useState("");
    const [formtrack, setFormTrack] = useState("");
    const [workorder, setWorkOrder] = useState("");
    const [name, setName] = useState("");
    const [schemaname, setSchemaName] = useState("");
    const [schemaId, setSchemaId] = useState("");

    const handleOrgName = (e) => {
        setName(e.target.value);
    }

    const handleWorkOrder = (e) => {
        setWorkOrder(e.target.value);
    }

    const handleFormTrack = (e) => {
        setFormTrack(e.target.value);
    }

    const handlePartNo = (e) => {
        setPartNo(e.target.value);
    }

    const handleSerialNo = (e) => {
        setSerialNo(e.target.value);
    }

    const handleWorkStatus = (e) => {
        setWorkStatus(e.target.value);
    }

    const handleSchemaName = (e) => {
        setSchemaName(e.target.value);
    }

    const createSchema = async (e) => {
        e.preventDefault();
        setLoader(false);

    await axios.get (`/api/organizations/${tenantId}/keys`).then((result_2)=>{
            console.log(result_2);
            
        });

     let packet = {
         name : schemaname,
         version: "1.0",
         attributes: [name,workstatus, serialno, partno, formtrack, workorder]
     }
     await axios.post('/api/createSchema', packet).then((result)=>{
         setStatus(true);
         setLoader(true);
         console.log(result.data);
         console.log(result.data.schemaId.body);
         setSchemaId(result.data.schemaId.body)
     })

    }

    const handleFlash = () => {
        setStatus(false);
    }

    //todo
    //CAAS should be able to create schema - done!
    //Use this schema to create credential definition (Thales Aerospace) - done!, but need to check one more cred def creation
    //Issue the cert to Singapore Airlines wallet
    //Certificate must be viewable from Singapore Airilines wallet

    //Schema component + Define Credential + Issue Component + Connection component =>Partof Home page
    //Profile Page (enough for now)
    //Wallet Page - must able to view the certificate of that org


    return (  <React.Fragment><Card width={"auto"} maxWidth={"420px"} mx={"auto"} px={[3, 3, 4]}>
            
    
    
<Box p={4}>
<Box>
    { status ? (<div><Flash my={3} variant="success">
                    Success!  
                    <Flash.Link onClick = {handleFlash}> click here</Flash.Link> to create another Schema. 
                </Flash>
                <Flash my={3} variant="info"> SchemaID as shown below</Flash>
                <Text fontWeight={"bold"}>{schemaId}</Text></div>
        ) : (
    
    <Form id = "addorgform" onSubmit={createSchema} >
        <Flash my={3} variant="info">
    Create New Schema!
  </Flash>
    <Flex mx={-3} flexWrap={"wrap"}>
    <Box px={3}>
        <Field label="Name of Schema " width={1}>
          <Input
            type="text"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handleSchemaName}
            value={schemaname}
            width={1}
          />
        </Field>
      </Box>
      <Box px={3}>
        <Field label="Attribute 1" width={1}>
          <Input
            type="text"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handleOrgName}
            value={name}
            width={1}
          />
        </Field>
      </Box>

      <Box px={3}>
        <Field label="Attribute 2" width={1}>
          <Input
            type="text"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handleWorkOrder}
            value={workorder}
            width={1}
          />
        </Field>
      </Box>
      <Box px={3}>
        <Field label="Attribute 3" width={1}>
          <Input
            type="text"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handleFormTrack}
            value={formtrack}
            width={1}
          />
        </Field>
      </Box>
      <Box px={3}>
        <Field label="Attribute 4" width={1}>
          <Input
            type="text"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handlePartNo}
            value={partno}
            width={1}
          />
        </Field>
      </Box>
      <Box px={3}>
        <Field label="Attribute 5" width={1}>
          <Input
            type="text"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handleSerialNo}
            value={serialno}
            width={1}
          />
        </Field>
      </Box>
      <Box px={3}>
        <Field label="Attribute 6" width={1}>
          <Input
            type="text"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handleWorkStatus}
            value={workstatus}
            width={1}
          />
        </Field>
      </Box>
     
    </Flex>
    
    <Box>
      
      { !loader ? <Loader color="red" size="40px"/> : <Button type="submit" >
        Create Schema
      </Button>}
    </Box>
  </Form>
)}
  
</Box>
</Box>
</Card>
</React.Fragment>)
}

export default Schema;
