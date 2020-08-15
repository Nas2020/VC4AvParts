import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {
    Box,
    Form,
    Input,
    Field,
    Button,
    Flex,
    Card,
    Radio,
    Flash,
    Loader
  } from "rimble-ui";
  import axios from 'axios';
  import Nav from '../../Nav';
  import Footer from '../../Footer';

function CustomForm() {
    const [formValidated, setFormValidated] = useState(false);
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [network, setNetwork] = useState("");
    const [logo, setLogo] = useState("");
    const [loader, setLoader] = useState(true);
    const [orgAdd, setOrgAdd] = useState(false);
    const [logintoken, setLoginToken] = useState(false);
    const [restart, setRestart] = useState(false);
    
    let history = useHistory();
   
    const handleInput = e => {
      setName(e.target.value);
      validateInput(e);
    };
  
    const handleFormInput = e => {
      setEmail(e.target.value);
      validateInput(e);
    };

    const handleLogoInput = e => {
        setLogo(e.target.value);
      };
  
  
    const handleRadio = e => {
      setNetwork(e.target.value);
      validateInput(e);
    };
  
    const validateInput = e => {
      e.target.parentNode.classList.add("was-validated");
    };
  
    const validateForm = () => {
      // Perform advanced validation here
      if (
        name.length > 0 &&
        network.length > 0
      ) {
        setValidated(true);
      } else {
        setValidated(false);
      }
    };
  
    useEffect(() => {
      validateForm();
    });
  
    let tenantId = '';
    async function createOrganization(e) {
        e.preventDefault();
        setLoader(false);
        console.log(network);
        let networkId = network.toLowerCase().replace(' ', '-');
        console.log(networkId);
        const organization = {
            name: name,
            imageUrl: logo,
            networkId: networkId,
            endorserType: 'Shared'
        }
         let result = await axios.post('/api/organizations', organization);
         console.log(result.status);
          if (result.status == 200 ){
            setOrgAdd(true);
            await refreshOrganizations();
            
          }
      
        }

        async function refreshOrganizations() {
          let response = await axios.get('/api/organizations');
          console.log(response);
          let tenants = response.data;
          for (let i = 0; i < tenants.length; i ++){
            if (tenants[i].name === name) {
            tenantId = tenants[i].tenantId;
            }
          }
          
          await issueCert ();
        }


async function issueCert() {

let loginCard = {
  "name" : name,
  "email": email,
  "tenantId": tenantId
}
await axios.post('/api/issuelogincertnew', loginCard).then((response_2)=>{

  if (response_2.status == 200){
            setLoginToken(true);
            console.log('send email to org email');
            setRestart(true);
           
     
        }
})
}

const handleFlash = () => {
            setName('');
            setEmail('');
            setNetwork('');
            setLogo('');
            setOrgAdd(false);
            setLoginToken(false);
            setRestart(false);
            setLoader(true);
            
}

function logout() {
  history.push('./login');
}

function home() {
  history.push('./admin');
}

    return (
      <React.Fragment>
            <Nav />
        <Card width={"auto"} maxWidth={"420px"} mx={"auto"} px={[3, 3, 4]}>
        <Button.Outline onClick = {home} >Home</Button.Outline>
        <Button.Outline onClick = {logout} variant = "danger" style = {{float: "right"}} >Logout</Button.Outline>
        
            
            <Flash my={3} variant="info">
              Onboarding New Organoisation!
            </Flash>
            { orgAdd ? (<Flash my={3} variant="success">
                          Organisation Onboarding.. Done!            
                          </Flash>) : null }
          { logintoken ? (<Flash my={3} variant="success">
                          Issue Login credential... Done! 
                          and send it into your org email!           
                          </Flash>) : null}
          { restart ? (<Flash my={3} variant="success">
            <Flash.Link onClick = {handleFlash}> click here</Flash.Link> to issue another cert. 
         </Flash>) : null}

<Box p={4}>

{ !loader ? (
<Loader color="red" size="40px"/>
) : (
  <Box>
  <Form id = "addorgform" onSubmit={createOrganization} validated={formValidated}>
    <Flex mx={-3} flexWrap={"wrap"}>
      <Box px={3}>
        <Field label="Organization Name" validated={validated} width={1}>
          <Form.Input
            type="text"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handleInput}
            value={name}
            width={1}
          />
        </Field>
      </Box>
      {/* <Box width={[1, 1, 1/2]} px={3}> */}
      <Box px={3}>
        <Field label="Organization Email" validated={validated} width={1}>
          <Form.Input
            type="email"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handleFormInput}
            value={email}
            width={1}
          />
        </Field>
      </Box>

      <Box px={3}>
        <Field label="Organization Logo" width={1}>
          <Form.Input
            type="text"
            required // set required attribute to use brower's HTML5 input validation
            onChange={handleLogoInput}
            value={logo}
            width={1}
          />
        </Field>
      </Box>
      <Box>
      <Field label="Network Options" validated={validated}>
        <Radio
          label="Sovrin"
          my={2}
          value={"sovrin"}
          checked={network === "sovrin"}
          onChange={handleRadio}
          required
        />
        <Radio
          label="Sovrin Staging"
          my={2}
          value={"sovrin-staging"}
          checked={network === "sovrin-staging"}
          onChange={handleRadio}
        />
      </Field>
    </Box>
    </Flex>
   
    <Box>
  <Button type="submit" disabled={!validated}>
    Add Organization
  </Button>
  </Box>
  </Form>
</Box>
  )}
</Box>
      </Card>
      <Footer />
      </React.Fragment>
    );
  }

 export default CustomForm;