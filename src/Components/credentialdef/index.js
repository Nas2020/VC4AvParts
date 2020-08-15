import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Box,Flash, Text, Form, Field, Input, Loader, Radio} from 'rimble-ui';
import Nav from '../Nav';
import Footer from '../Footer';


const CredentialDef =  () => {
const tenantId = "d3RBSlKRvm0VvyDtqeuFHnKvKr7TWQ05";//Thales now
const [schemaId, setSchemaId] = useState("");
const [tag, setTag] = useState("");
const [revocation, setRevocation] = useState(false);
const [status, setStatus] = useState(false);
const [loader, setLoader] = useState(true);
const [validated, setValidated] = useState(false);
const [definitionid, setDefinitionId] = useState("");



useEffect(() => {
    validateForm();
  });




  const validateForm = () => {
    // Perform advanced validation here
    if (
      schemaId.length > 0
    ) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };


//view CredDef
const getCredDef = async () => {

    await axios.get (`/api/organizations/${tenantId}/keys`).then((result_2)=>{
        console.log(result_2);
        
    });

    await axios.get ('/api/listallcredentialdef').then ((result)=>{
        console.log(result);
        //setNumCredDef(result_5.data.length);
        
    })
}

//create Credential Definition

const createCredDef = async () => {
    
    await axios.get (`/api/organizations/${tenantId}/keys`).then((result_2)=>{
        console.log(result_2);
        
    });

    await axios.post ('/api/createCredentialDef').then ((result_3)=> {
        console.log(result_3);
    })
}

const getallorg = async () => {
await axios.get ('/api/organizations').then ((result)=>{
    console.log(result);
})
}

const createConnection = async () => {

    await axios.get (`/api/organizations/${tenantId}/keys`).then((result_2)=>{
        console.log(result_2);
        
    });

    let packet = {
        'name': "singapore-connect-to-thales",
        'connectionId': null,
        'multiParty' : false
    }
    await axios.post('/api/connections', packet).then((response)=>{
        console.log(response);
    })
}
const handleInputSchema = async (e) => {
    setSchemaId(e.target.value);
    validateInput(e);
}

const handleInputTag = async (e) => {
    setTag(e.target.value);
}

const handleRadio = async (e) => {

    if ((e.target.value)=== 'true') {
        return setRevocation(true);
    }
    setRevocation(false);
   
}

const validateInput = e => {
    e.target.parentNode.classList.add("was-validated");
  };

const createCredDefbySchemaId = async (e) => {
    e.preventDefault();
        setLoader(false);

        //To set accesstoken on backend
        await axios.get (`/api/organizations/${tenantId}/keys`).then((result_2)=>{
            console.log(result_2);
            
        });

    let packet = {
        body: {
            supportRevocation: revocation,
            tag: tag
        }
    }

    await axios.post ('/api/createDefbySchemaId/' + schemaId, packet).then((result=>{
        console.log(result);
        console.log(result.data.definitionId);
        setDefinitionId(result.data.definitionId);
        setStatus(true);
        setLoader(true);
    }));

}

        const handleFlash = () => {
            setStatus(false);
        }

    return (
        <React.Fragment>
          <Nav />
        <Card width={"auto"} maxWidth={"420px"} mx={"auto"} px={[3, 3, 4]}>
        { status ? (<div>
                    <Flash my={3} variant="success">
                      Success! 
                      <Flash.Link onClick = {handleFlash}> click here</Flash.Link> to define another Credential.            
                    </Flash>
                    <Flash my={3} variant="info"> definitionId as shown below</Flash>
                <Text fontWeight={"bold"}>{definitionid}</Text>
                    </div>
                    ) : (

                        <Box p={4}>
                             <Flash my={3} variant="info">
                                Create Credential Definition by SchemaID!
                             </Flash>
                        <Box>
                          <Form onSubmit={createCredDefbySchemaId} >
                            
                                {/* Schema ID Retrieval */}
                              <Box px={3}> 
                                <Field label="Schema ID"  width={1} validated={validated}>
                                  <Input
                                    type="text"
                                    required // set required attribute to use brower's HTML5 input validation
                                    onChange={handleInputSchema}
                                    value={schemaId}
                                    width={1}
                                  />
                                </Field>
                              </Box>
                    
                             {/* Tag */}
                              <Box px={3}>
                                <Field label="Tag"  width={1}>
                                  <Form.Input
                                    type="text"
                                    required // set required attribute to use brower's HTML5 input validation
                                    onChange={handleInputTag}
                                    // value={email}
                                    width={1}
                                  />
                                </Field>
                              </Box>
                            
                    
                            {/* Support revocation */}
                            <Box>
                              <Field label="Support Revocation" validated={validated}>
                                <Radio
                                  label="True"
                                  my={2}
                                  value= {'true'}
                                   checked={revocation === true}
                                  onChange={handleRadio}
                                  required
                                />
                                <Radio
                                  label="False"
                                  my={2}
                                  value= {'false'}
                                  checked={revocation === false}
                                  onChange={handleRadio}
                                />
                              </Field>
                            </Box>
                    
                            <Box>
                                 { !loader ? <Loader color="red" size="40px"/> : ( <Button type="submit" >
                                Create Credential Defenition
                              </Button>)}
                             
                            </Box>
                          </Form>
                        </Box>
                      </Box>

                    ) } 
  
  </Card>
  <Footer />
  </React.Fragment>
            
            )
}

export default CredentialDef;
