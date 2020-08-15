const express = require('express');
const router = express.Router();
const cors = require('cors');
const {
  CredentialsServiceClient,
  ProviderServiceClient,
  WalletServiceClient,
  Credentials,
  ProviderCredentials 
} = require("@trinsic/service-clients");
const nodemailer = require('nodemailer');
require('dotenv').config();



let credAccessToken = "";


// ************************************** FOR ADMIN USAGE*******************************
// Provider API
const providerClient = new ProviderServiceClient(
  new ProviderCredentials(process.env.PROVIDER_TOKEN),
  { noRetryPolicy: true }
);

const adminClient = new CredentialsServiceClient(
  new Credentials(process.env.ADMIN_ACCESSTOK),
  { noRetryPolicy: true}
);
// ************************************** FOR ADMIN USAGE*********************************




//Get all networks
router.get('/networks', cors(), async function (req, res) {
  try {
   
    let networks = await credentialsClient.listNetworks();
    res.status(200).send(networks)
  }
  catch (err){
     console.log(err.massage);
     return;
  }
});

//get all the connections

router.get('/connections', cors(), async function (req, res) {
  try {
    
    let state = null; // Can be null | "Invited" | "Negotiating" | "Connected"
    let connections = await credentialsClient.listConnections(state);
    console.log(connections);
    res.status(200).send(connections);
  }
  catch(err){
    console.log(err.message);
}
});



router.get('/listalltenant', cors(), async function (req, res) {
  try {
    
    let tenants = await providerClient.listTenants();
    
    res.status(200).send(tenants);
  }
  catch (err){
    console.log(err.message);

  }
})



router.post ('/createDefbySchemaId/:schemaId', async function (req, res){
  const credentialsClient = new CredentialsServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );
  console.log(req.params);
  console.log(req.params.schemaId);
  console.log(req.body);
  let credentialDefinition = await credentialsClient.createCredentialDefinitionForSchemaId(req.params.schemaId, req.body
  );
  res.status(200).send(credentialDefinition);
});


router.post('/createSchema', async function (req, res){
  console.log(req.body);
  const credentialsClient = new CredentialsServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );
  let schemaId = await credentialsClient.createSchema({
    name: req.body.name,
    version: req.body.version,
    attributeNames: req.body.attributes
  });
  res.status(200)
  res.status(200).send({ schemaId });
});

router.get('/getAllSchema', cors(), async function (req, res){
  let schemas = await credentialsClient.listSchemas();
  res.status(200).send(schemas);
});

// get All Credentials
router.get('/getAllCredentials', cors(), async function (req, res){
  
let connectionId = null; // Can be null | <connection identifier>
let state = null; // Can be null | "Offered" | "Requested" | "Issued" | "Rejected" | "Revoked"
let definitionId = null; // Can be null | <definition identifier>
let credentials = await credentialsClient.listCredentials(connectionId, state, definitionId);
res.status(200).send(credentials);
});

router.post('/:walletId/credentials/:credentialId', async function (req, res){
  const walletClient = new WalletServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );
  console.log(req.params);
  let walletId = req.params.walletId;
  let credentialId = req.params.credentialId;
  let credential = await walletClient.acceptCredentialOffer(walletId, credentialId);
  res.status(200).send(credential);
})

router.get ('/:walletId/credentials/connection/:connectionId', async function (req, res){
  const walletClient = new WalletServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );
  console.log(req.params);
  let walletId = req.params.walletId;
  let connectionId = req.params.connectionId;
  let credentials = await walletClient.listCredentialsForConnectionId(walletId, connectionId);
  res.status(200).send(credentials);
})

  router.put ('/:walletId/acceptCredOfferWfrmURL/fromData', async function (req, res){
    console.log('i can be here');
    console.log(req.body);
    let definitionId = req.body.definitionId; 
    console.log(definitionId);
  let ACCESSTOK_1 = '3DiVT27l5jocvLQHCtgDQIslPMFE_p-INt36vGLj9bM';
  const credentialsClientT = new CredentialsServiceClient(
    new Credentials(ACCESSTOK_1),
    { noRetryPolicy: true }
  );
  console.log(credentialsClientT);
  let credential = await credentialsClientT.createCredential({
    definitionId: definitionId,
    credentialValues: { Name: 'Test Name' }
});

console.log(credential);
let walletId = req.params.walletId
console.log(walletId);
await walletClient.acceptCredential(walletId, credential.offerUrl);

let credentials = await walletClient.listCredentials(walletId);
console.log(credentials);

    res.status(200).send(credential);
    })
 
  

  router.post('/verify', cors(), async function (req, res) {
    console.log(process.env.ADMIN_LOGIN_POLICY_ID);
    let verification = await adminClient.createVerificationFromPolicy(process.env.ADMIN_LOGIN_POLICY_ID);
    console.log(verification);
    res.status(200).send({
      verificationRequestData: verification.verificationRequestData,
      verificationRequestUrl: verification.verificationRequestUrl,
      verificationId: verification.verificationId
    });
  });

  router.post('/orgloginverify', cors(), async function (req, res) {
    console.log(process.env.ADMIN_TO_ORG_LOGIN_POLICY_ID);
    let verification = await adminClient.createVerificationFromPolicy(process.env.ADMIN_TO_ORG_LOGIN_POLICY_ID);
    //console.log(verification);
    res.status(200).send({
      verificationRequestData: verification.verificationRequestData,
      verificationRequestUrl: verification.verificationRequestUrl,
      verificationId: verification.verificationId
    });
  });

  router.get('/checkVerification/:verificationId', cors(), async function (req, res) {
    let verificationId = req.params.verificationId;
    console.log(verificationId);
    let verification = await adminClient.getVerification(verificationId);
    console.log(verification);
    console.log(verification.proof)
    //get get admin id and provider key to jwt  
    res.status(200).send({
      verification: verification
    });
  });

  //

  router.get('/listallverification', cors(), async function (req, res){
    const credentialsClient = new CredentialsServiceClient(
      new Credentials(credAccessToken),
      { noRetryPolicy: true }
    );
    let verifications = await credentialsClient.listVerifications();
     res.status(200).send(verifications);
  })


  router.get('/listallverificationpolicy', cors(), async function (req, res){
    const credentialsClient = new CredentialsServiceClient(
      new Credentials(credAccessToken),
      { noRetryPolicy: true }
    );
    let verifications = await credentialsClient.listVerificationPolicies();
     res.status(200).send(verifications);
  })

  /* Webhook endpoint */
router.post('/webhook', async function (req, res) {
  try {
    console.log("got webhook" + req + "   type: " + req.body.message_type);
    if (req.body.message_type === 'new_connection') {
      console.log("new connection notification");
      const attribs = cache.get(req.body.object_id)
      if (attribs) {
        let param_obj = JSON.parse(attribs);
        let params = {
          definitionId: process.env.CRED_DEF_ID,
          connectionId: req.body.object_id,
          automaticIssuance: true,
          credentialValues: {
            "name": param_obj["name"],
            "email": param_obj["email"],
            "accesstoken": param_obj["accesstoken"]
          }
        }
        await adminClient.createCredential(params);
      }
    }
  }
  catch (e) {
    console.log(e.message || e.toString());
  }
});


//After Org Login

router.get ('/organizations/:tenantId/keys', cors(), async function (req, res){
  console.log(req.params.tenantId);
  let keys = await providerClient.getTenantKeys(req.params.tenantId);
  credAccessToken = keys.accessToken;
  //console.log(keys);
  // console.log(credAccessToken);
  res.status(200).send(keys);
})

router.get ('/listallconnections', cors(), async function(req, res){

  console.log(`accesstoken ${credAccessToken}`);
  const credentialsClient = new CredentialsServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );
   let state = null; // Can be null | "Invited" | "Negotiating" | "Connected"
   let connections = await credentialsClient.listConnections(state);
   console.log(connections);
   res.status(200).send(connections);
})

router.get ('/listallwallets', cors(), async function(req, res){
  const walletClient = new WalletServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );
  let wallets = await walletClient.listWallets();
  res.status(200).send(wallets);
})

router.get ('/listallcredentialdef', cors(), async function (req, res){
    const credentialsClient = new CredentialsServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );
  let credentialDefinitions = await credentialsClient.listCredentialDefinitions();
  res.status(200).send(credentialDefinitions);
})

router.get ('/listallschemas', cors(), async function (req, res){
  const credentialsClient = new CredentialsServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );
   let schemas = await credentialsClient.listSchemas();
   res.status(200).send(schemas);
});


router.post ('/createCredentialDef', async function (req, res){
  const credentialsClient = new CredentialsServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );

let attributes = ["name", "email", "tenantId"];
let credentialDefinition = await credentialsClient.createCredentialDefinition({
  name: "Org LoginCredDef",
  version: "1.0", // Must follow Semantic Versioning scheme (https://semver.org),
  attributes: attributes,
  supportRevocation: false, // Enable revocation at a later date
  tag: "tag" // Tag to identify the schema
});
res.status(200).send(credentialDefinition);
});


router.post ('/issuelogincertnew', async function (req, res){
  let credentialValues = req.body;
  console.log(req.params);
  console.log(req.params.credentialId);
  let connectionId = null; // Can be null | <connection identifier>
  let automaticIssuance = true;
  let result = await adminClient.createCredential({
    definitionId: process.env.ADMIN_CRED_DEF_ID,
    connectionId: connectionId,
    automaticIssuance: automaticIssuance,
    credentialValues: credentialValues
  });
  if (res.statusCode === 200 ){
    console.log(result.offerUrl);
      //sending email of QR code url 
      //step 1
      let transporter = nodemailer.createTransport ({
        service: 'gmail',
        auth: {
          user: 'cher.naseer@gmail.com',
          pass: 'bismillah17%'
        }
      });

            //step 2
            let mailOptions = {
              from: 'cher.naseer@gmail.com',
              to: req.body.email,
              subject: "Accept your login Credential",
              text: result.offerUrl
            };

                  //step 3
                  transporter.sendMail(mailOptions, function(err, data) {
                    if (err) {
                      console.log('Error occurs', err);
                    } else {
                      console.log('Email sent success');
                    }
  
                  });
  }
  res.status(200).send(result);
})


//Create Connection for Orga CAAS

router.post ('/connections', async function (req,res){
  const credentialsClient = new CredentialsServiceClient(
    new Credentials(credAccessToken),
    { noRetryPolicy: true }
  );
  console.log(req.body);
  let name = req.body.name;
  let connectionId = req.body.connectionId;
  let multiParty = req.body.multiParty;
  let connection = await credentialsClient.createConnection({
  name: name,
  connectionId: connectionId,
  multiParty: multiParty
});
res.status(200).send(connection);
})

//create wallet for org SIA
router.post ('/createwallet', async function (req, res) {
  const walletClient = new WalletServiceClient(
     new Credentials(credAccessToken),
      { noRetryPolicy: true }
   );
console.log(req.body);
let ownerName = req.body.name; // Can be null
let walletId = req.body.walletId; // Can be null

let wallet = await walletClient.createWallet({
    body: {
            ownerName: ownerName,   
            walletId: walletId
        }
                
            }); 
      res.status(200).send(wallet);
});

router.post ('/:walletId/acceptInvitation/invitation', async function (req, res) {
  const walletClient = new WalletServiceClient(
     new Credentials(credAccessToken),
      { noRetryPolicy: true }
   );
console.log(req.body);
let invitation = req.body.invitation;
console.log(invitation);
let walletId = req.params.walletId;
console.log(walletId);
let connection = await walletClient.acceptInvitation(walletId, invitation);
res.status(200).send(connection);
  });



  router.post ('/issuecredential', cors(), async function (req, res) {
    const credentialsClient = new CredentialsServiceClient(
      new Credentials(credAccessToken),
      { noRetryPolicy: true }
    );
    console.log(req.body);
    let credential = await credentialsClient.createCredential({
      definitionId: req.body.definitionId,
      connectionId: req.bodyconnectionId,
      automaticIssuance: req.body.automaticIssuance,
      credentialValues: req.body.credentialValues
});
    res.status(200).send(credential);
  })

  router.post('/issue', cors(), async function (req, res) {
    const invite = await getInvite();
    const attribs = JSON.stringify(req.body);
  console.log(req.body);
    cache.add(invite.connectionId, attribs);
    res.status(200).send({ invitation: invite.invitationUrl });
  });

router.post('/organizations', async function (req, res) {
  let params = {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    networkId: req.body.networkId,
    endorserType: req.body.endorserType
  }
  await adminClient.createTenant(params);
  res.sendStatus(200);
});



router.delete('/organizations/:organizationId', async function (req, res) {
  let tenantId = req.params.organizationId;
  await providerClient.deleteTenant(tenantId);
  res.sendStatus(200);
});

router.get('/organizations/:tenantId', async function (req, res) {

  let result = await providerClient.getTenant(req.params.tenantId);
 
  res.status(200).send(result);
});


router.get('/organizations', async function (req, res) {
try {

  let tenants = await providerClient.listTenants();
  res.status(200).send(tenants);
}
catch (err) {
  console.log(err.message);
  return;
}
});

router.patch('/organizations/:organizationId', async function (req, res) {
  let result = await providerClient.changeTenantKeys(req.params.organizationId);
  res.status(200).send(result);
});

module.exports = router;
