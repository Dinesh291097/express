var express = require('express');
var router = express.Router();
const Userschema = require('../models/userschema');

router.post('/data', async(req,res)=>{
    const { email,password}=req.body
    try{
        const Loginexists = await Userschema.findOne({ email: email, password:password });
        console.log(Loginexists);
        if (!Loginexists) {
          return res.status(401).json({ message: 'Invalid user' });
          }

        else{
        let userId=Loginexists._id

            return res.status(200).json({message:`Login sucesssfully- 
            your ID ${userId}`,userId});
          
          }
      }
    catch (error) {
        console.error(error.message);
        res.status(500).send('network error');
      }
    
})
module.exports = router;