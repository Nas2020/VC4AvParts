const express = require('express');
const router = express.Router();

/* GET AdminPage page */ 
router.get('/AdminPage', function(req, res, next) {
  //res.render('index');
});

/* GET OrgPage page */ 
router.get('/OrgPage', function(req, res, next) {
  //res.render('index');
});

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
            "Full Name": param_obj["name"],
            "Title": param_obj["title"],
            "Company Name": param_obj["org"],
            "Phone Number": param_obj["phone"],
            "Email": param_obj["email"]
          }
        }
        await client.createCredential(params);
      }
    }
  }
  catch (e) {
    console.log(e.message || e.toString());
  }
});

module.exports = router;
