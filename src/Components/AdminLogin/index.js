import React, {useState} from 'react';
import { Card, Loader, Box, Link, Button, Text, ToastMessage, Flash } from 'rimble-ui';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
//import { useCookies } from 'react-cookie';
import { Cancel } from '@rimble/icons';
import logo from './logo_VC4AvParts.png';
import './Login.css';


const AdminLogin = () => {

        //const [cookies, setCookie] = useCookies();
        const [displayqrcode, setDisplayqrcode] = useState(false);
        const [qrcodeimage, setQRCodeImage] = useState("");
        const [qrcodeimageorg, setQRCodeImageOrg] = useState("");
        const [showqrcode, setShowqrcode] = useState(false);
        const [loaderOrg, setLoaderOrg] = useState(false);
        const [loader, setLoader] = useState(false);
        
        const history = useHistory();
      
        let verificationId = '';
        let tenantId = '';
        let URL = '';
        let URL_Org = '';

        const verifyOrgLogin = async () => {

            setLoaderOrg(true);
           await axios.post('/api/orgloginverify').then((response )=> {
            verificationId = response.data.verificationId;
            URL_Org = response.data.verificationId;
            setQRCodeImageOrg('https://chart.googleapis.com/chart?cht=qr&chl=' + response.data.verificationRequestUrl+ '&chs=300x300&chld=L|1');
            setLoaderOrg(false);
            setShowqrcode(true);
           });
            

            let verification = {state: "Requested"};
            let timedOut = false;
            setTimeout(() => timedOut = true, 1000 * 60);
                while (!timedOut && verification.state === "Requested") {
                    let checkResponse = await axios.get('/api/checkVerification/'+ verificationId);
                        verification = checkResponse.data.verification;
                        console.log(verification);
                                                                        }
    
                    if (verification.state === "Accepted") {
                            console.log(verification);
                            
                            console.log (verification.proof.Org_LoginCredDef.attributes.tenantId);
                            tenantId = verification.proof.Org_LoginCredDef.attributes.tenantId;
                            console.log(tenantId);
                                //setCookie('distributorJWT', res.data.distributorJWT);
                                history.push('/profile', {tenantId: tenantId});
                                                             }
                                            }
       

        const verifyLogin = async () => {
               
            setLoader(true);
            await axios.post('/api/verify').then((response)=>{
                console.log(response);
                console.log(response.status);
                verificationId = response.data.verificationId;
                console.log(verificationId);
                console.log(response.data.verificationRequestUrl); 
                URL = response.data.verificationRequestUrl;
                setQRCodeImage('https://chart.googleapis.com/chart?cht=qr&chl=' + response.data.verificationRequestUrl + '&chs=300x300&chld=L|1');
                console.log(`qrcodeimage ${qrcodeimage}`);
                setLoader(false);
                setDisplayqrcode(true);
            });

            console.log(`displayqrcode ${displayqrcode}`);
            let verification = {state: "Requested"};
            let timedOut = false;
            setTimeout(() => timedOut = true, 1000 * 60);
            while (!timedOut && verification.state === "Requested") {
                let checkResponse = await axios.get('/api/checkVerification/' + verificationId);
                verification = checkResponse.data.verification;
                console.log(verification);
                    }

                    if (verification.state === "Accepted") {
                        console.log(verification.state);
                            //setCookie('distributorJWT', res.data.distributorJWT);
                            history.push('/admin');
                        }
                    } 

            const cancelAdminLogin = () => {
                setDisplayqrcode(false);
                setShowqrcode(false);
                                            }

            const cancelOrgLogin = ()=> {
                setShowqrcode(false);
                setDisplayqrcode(false);
                                        }
                
    return ( <React.Fragment>

            <div className="App">
                <header className = "LoginHeader"> 
                <img src={logo} className="App-logo" alt="logo" />
            { (displayqrcode) ? (   
            <Card width={"auto"} maxWidth={"400px"} mx={"auto"} px={[3, 3, 4]} p ={0} >
                <Cancel style={{float:'right'}} onClick = {cancelAdminLogin} />
                        <Flash my={4} variant="warning">
                        Note! This is admin section. 
                        </Flash>
                            <img id="qrcode" src={qrcodeimage} alt="QR code"/>
                                <Text fontWeight={"bold"}>Or click below to </Text>
                                    <Link href={URL}  target="_blank" title="This link goes somewhere">
                                    Connect to your mobile wallet
                                    </Link>
            </Card>
                                ) : (

            <Card width={"auto"} maxWidth={"400px"} mx={"auto"} px={[3, 3, 4]} p ={0} >
                <Box>
                    <Link title="This link goes somewhere" style={{float:'right'}} onClick = {verifyLogin}>
                    Admin click here!
                    </Link>
                            {loader ? <Loader size="40px" /> : null } 

                </Box>
            
                <Box>
                 {
                    (showqrcode ? (
                    
                    <Box>
                         <Cancel style={{float:'left'}} onClick = {cancelOrgLogin} />
                            <img id="qrcode" src={qrcodeimageorg} alt="QR code"/>
                                <Text fontWeight={"bold"}>Or click below to </Text>
                                    <Link href={URL_Org}  target="_blank" title="This link goes somewhere">
                                    Connect to your mobile wallet
                                    </Link>
                                    </Box>
                                    ): (
                                    
                                    <Box>
                                        <ToastMessage message={"Welcome to VC4AvParts! "} icon={"Mood"} my={4} />
                                            <Flash my={3} variant="info">
                                            Verifiable Credential for Aviation Parts. 
                                            </Flash>
                                        <Button.Outline 
                                        style={{float:'right'}} 
                                        icon="Send" iconpos="right" mr={3} 
                                        type = 'submit' onClick ={ verifyOrgLogin }> 
                                        Login
                                        </Button.Outline> 
                                        {loaderOrg ? <Loader size="40px" /> : null } 
                                     </Box>))

                 }
               
                </Box>
            </Card>
        )
            }
            
            </header>  
            </div>
            </React.Fragment>);
}

export default AdminLogin;