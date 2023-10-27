 var express = require('express');
var router = express.Router();
const Userschema = require('../models/userschema');

/* GET users listing. */
router.post('/data', async (req, res) => {
  const { Name, email, password, confirmPassword, acceptTerms } = req.body;

  try {
    const exists = await Userschema.findOne({ email: email });
    if (exists) {
      return res.status(400).json({message:'Email is already registered!'});
    }

    let userlist = {
      Name,
      email,
      password,
      confirmPassword,
      acceptTerms,
    }

    await Userschema.create(userlist);
    res.status(200).json({ msg: 'Register successfully'});
    console.log('Data added to the DB');
    
  } 
  catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
