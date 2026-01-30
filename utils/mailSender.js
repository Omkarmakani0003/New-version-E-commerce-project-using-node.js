const mail = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config();



exports.mailSender = async(Data) => {
    try{
    const { TransactionalEmailsApi, SendSmtpEmail } = require('@getbrevo/brevo');
    const emailAPI = new TransactionalEmailsApi();
    emailAPI.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

    const message = new SendSmtpEmail();
    message.subject =  Data.subject;
    message.textContent = Data.text;
    message.sender = { name: "E-shop", email: process.env.EMAIL };
    message.to = [{ email: Data.email, name: Data.email }];

    await emailAPI.sendTransacEmail(message)
   .then((res) => {
        console.error(res.body) 
    })
   .catch((err) => {
        console.error(err.response?.data || err) 
    });

    return true

    }catch(error){
        console.error(error.message)
    }
}
