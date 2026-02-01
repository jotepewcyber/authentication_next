import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs';

export const sendEmail=async({email , emailType , userId}:any)=>{
try {
    //TODO:configure mail for usage
   const hashedToken= await bcrypt.hash(userId.toString(),10)

//if verify email was sent
if(emailType==='VERIFY'){
  await User.findByIdAndUpdate(userId,{
    //If user with this id exist
   // then create verify token
   $set: {
verifyToken:hashedToken,
verifyTokenExpiry:Date.now()+3600000  //1 hour from now
    }
  }
  )}
  else if(emailType==='RESET')  {
  await User.findByIdAndUpdate(userId,{
    $set:{
 forgotPasswordToken:hashedToken,
 forgotPasswordTokenExpiry:Date.now() + 3600000 
    }
  })
}



var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4b8ad19d74e42a",  //??
    pass: "dd880d630e40b0"   //??
  }
});

    
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // Use true for port 465, false for port 587
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
// });


//We can't directly verify a token by link bcz some browsers auto visit the links in mail to check if hey are spam
const mailOptions={
     from: 'cyber23enthusiast@gmail.com', // sender address
    to: email,
    subject: emailType==='VERIFY' ? "Verify your email":"Reset your password",
    html: `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">here</a> to ${emailType==='VERIFY'?"verify your email":"reset your password"} or copy paste the link in your browser.</br>${process.env.DOMAIN}/verify-email?token=${hashedToken}</p>`
}
//  /api/users will automatically be added to domain in .env bcz we are calling this in /api/users folder

const mailResponse=await transport.sendMail(mailOptions)
return mailResponse
} catch (error:any) {
    throw new Error('email not sent' + error)
}
}