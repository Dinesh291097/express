var express = require('express');
var router = express.Router();
const userschema = require('../models/userschema');


///user detail set in the field
router.post('/data',async (req,res)=>{
    let updatebackend=req.body
    const userId=updatebackend.id
    // console.log(userId);
    const userfinder=await userschema.findOne({_id:userId})
    // console.log(userfinder);
    res.status(200).json(userfinder);
    
})

//main update process
router.post('/:id',async(req,res)=>{
    const { Name, email, password, confirmPassword, acceptTerms } = req.body;
    const userIdVerify=req.params.id

     try{
      const updatemsg=  await userschema.updateOne(
        {_id:userIdVerify},
            {$set:
                {Name:Name,email:email,password:password,confirmPassword:confirmPassword,acceptTerms:acceptTerms}
            })
     
     res.status(200).json({msg:'update sucess',updatemsg})
     }catch(err){
        console.log(err);
     }

})

router.post('/delete/:id',async (req,res)=>{
    let detail=req.params.id;
    try{
        const userdelete=await userschema.deleteOne(
            {_id:detail}
        )  
        res.status(200).json({msg:'Deleted',userdelete})
    }catch(err){
        console.log(err);
     }
  
})


module.exports = router;


