const { otp } = require('../models/otp')
const { mailSender } = require('../utils/mailSender') 

exports.SendOtp = async(email)=>{

   try{
       const generate_otp = Math.floor(1000 + Math.random() * 9000);
         const now = new Date();
         const expiry = now.getTime() + (10 * 60000)
         
         const updateData = {
            otp : generate_otp,
            email : email,
            expiryAt : expiry
         };

         const Otp = await otp.findOneAndUpdate(

               { email: email },   
               { $set: updateData },        
               {
                  new: true,                 
                  upsert: true,              
                  runValidators: true
               }
         );

        if(Otp){

            const data = {
               'email' : email,
               'subject' : 'OTP for user varification',
               'text' : `Your otp is : ${generate_otp}`
            }
            const send = await mailSender(data)
 
            if(send){
               return true 
            }
        }
   }catch(error){
      console.log(error.message)
   }

}
        