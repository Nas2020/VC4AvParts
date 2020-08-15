import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { Button, Flex, Card, Box,Flash, Text, Form, Field, Input, Loader, Radio} from 'rimble-ui';
import Nav from '../Nav';
import Footer from '../Footer';

const IssueCert = (props)=>{

    let tenantId = props.location.state.tenantId;

    const [autoissuance, setAutoIssuance] = useState(false);
    const [partno, setPartNo] = useState("");
    const [workorder, setWorkOrder] = useState("");
    const [formtracking, setFormTracking] = useState("");
    const [credstatus, setCredStatus] = useState("");
    const [serialno, setSerialNo] = useState("");
    const [orgname, setOrgName] = useState("");
    const [connectionId, setConnectionId] = useState("");
    const [definitionId, setDefinitionId] = useState("");

    const [status, setStatus] = useState(false);
    const [loader, setLoader] = useState(true);

    const[credId, setCredId] = useState("");

    let history = useHistory();



    const handleFlash = () => {
        setStatus(false);
    }

    const handlePartno = async (e) => {
        setPartNo(e.target.value);
    }

    const handleWorkOrder = async (e) => {
        setWorkOrder(e.target.value);
    }

    const handleformTracking = async (e) => {
        setFormTracking(e.target.value);
    }

    const handleStatus = async (e) => {
        setCredStatus(e.target.value);
    }

    const handleSN = async (e) => {
        setSerialNo(e.target.value);
    }

    const handleOrgName = async (e) => {
        setOrgName(e.target.value);
    }

    const handleConnId = async (e) => {
        setConnectionId(e.target.value);
    }

    const handleDefId = async (e) => {
        setDefinitionId(e.target.value);
    }

    const handleRadio = async (e) => {

        if ((e.target.value)=== 'true') {
            return setAutoIssuance(true);
        }
        setAutoIssuance(false);
       
    }

    const issue = async (e) => {
        e.preventDefault();
        setLoader(false);
        //To set accesstoken on backend
        await axios.get (`/api/organizations/${tenantId}/keys`).then((result_2)=>{
            console.log(result_2);
            
        });

        let packet = {
            definitionId: definitionId,
            automaticIssuance: autoissuance,
            connectionId: connectionId,
            credentialValues: {
                "OrgName": orgname,
                "Serial No": serialno,
                "Status": credstatus,
                "Form Tracking Number": formtracking,
                "Work Order": workorder,
                "Part No": partno
            }
        }
        await axios.post ('/api/issuecredential', packet).then ((result)=>{
            console.log(result.data);
            setCredId(result.data.credentialId);
            setStatus(true);
        })

    }

    function logout () {
        history.push('/login');
    }

    function home () {
        history.push ('/profile', {tenantId:tenantId});
    }

    return(
        <React.Fragment >
            <Nav />
            
    <Card width={"auto"} maxWidth={"420px"} mx={"auto"} px={[3, 3, 4]}>
        <Button.Outline onClick = {home} >Home</Button.Outline>
            <Button.Outline onClick = {logout} variant = "danger" style = {{float: "right"}} >Logout</Button.Outline>
                <Box p={4}>
                    <Box>
                        { status ? (<div><Flash my={3} variant="success">
                                     Success!  
                    <Flash.Link onClick = {handleFlash}> click here</Flash.Link> to issue another cert. 
                                        </Flash>
                <Flash my={3} variant="info"> CredentialID as shown below</Flash>
                <Text fontWeight={"bold"}>{credId}</Text></div>

                        ): (
                            <Form onSubmit={issue} >
                            <Flash my={3} variant="info">
                        Issue New Cert to Your connection!
                      </Flash>
                      <Flex mx={-3} flexWrap={"wrap"}>
                      <Box px={3}>
                            <Field label="DefenitionId " width={1}>
                            <Input
                                type="text"
                                required // set required attribute to use brower's HTML5 input validation
                                onChange={handleDefId}
                                value={definitionId}
                                width={1}
                            />
                            </Field>
                        </Box>
                        <Box px={3}>
                            <Field label="ConnectionId " width={1}>
                            <Input
                                type="text"
                                required // set required attribute to use brower's HTML5 input validation
                                onChange={handleConnId}
                                value={connectionId}
                                width={1}
                            />
                            </Field>
                        </Box>
                        <Box px={3}>
                            <Field label="OrgName " width={1}>
                            <Input
                                type="text"
                                required // set required attribute to use brower's HTML5 input validation
                                onChange={handleOrgName}
                                value={orgname}
                                width={1}
                            />
                            </Field>
                        </Box>
                        <Box px={3}>
                            <Field label="Serial No " width={1}>
                            <Input
                                type="text"
                                required // set required attribute to use brower's HTML5 input validation
                                onChange={handleSN}
                                value={serialno}
                                width={1}
                            />
                            </Field>
                        </Box>
                        <Box px={3}>
                            <Field label="Status " width={1}>
                            <Input
                                type="text"
                                required // set required attribute to use brower's HTML5 input validation
                                onChange={handleStatus}
                                value={credstatus}
                                width={1}
                            />
                            </Field>
                        </Box>
                        <Box px={3}>
                            <Field label="Form Tracking Number " width={1}>
                            <Input
                                type="text"
                                required // set required attribute to use brower's HTML5 input validation
                                onChange={handleformTracking}
                                value={formtracking}
                                width={1}
                            />
                            </Field>
                        </Box>
                        <Box px={3}>
                            <Field label="Work Order " width={1}>
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
                            <Field label="Part No " width={1}>
                            <Input
                                type="text"
                                required // set required attribute to use brower's HTML5 input validation
                                onChange={handlePartno}
                                value={partno}
                                width={1}
                            />
                            </Field>
                        </Box>
                        <Box>
                              <Field label="Automatic Issuance" >
                                <Radio
                                  label="True"
                                  my={2}
                                  value= {'true'}
                                   checked={autoissuance === true}
                                  onChange={handleRadio}
                                  required
                                />
                                <Radio
                                  label="False"
                                  my={2}
                                  value= {'false'}
                                  checked={autoissuance === false}
                                  onChange={handleRadio}
                                />
                              </Field>
                            </Box>
                            </Flex>
                            <Box>
                                 { !loader ? <Loader color="red" size="40px"/> : ( <Button type="submit" >
                                Issue Certificate
                              </Button>)}
                             
                            </Box>
                      

                      </Form>

                        )}
                    </Box>
                </Box>
                </Card>

                <Footer />
        </React.Fragment>
        
        )


}

export default IssueCert;