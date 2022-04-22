
const express = require('express');
require('dotenv').config()
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();

app.use(express.json());

app.use(cors());


app.post('/send_mail', async (req,res) => {
    
    const transport = nodemailer.createTransport({    
        service:'gmail', 
        auth: {
            user:'milleraseani@gmail.com',
            pass: process.env.REACT_APP_EMAIL
        }
    });

//

  const mailResult = JSON.stringify(req.body);
  
  const imageLink = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VsZGluZ3xlbnwwfHwwfHw%3D&w=1000&q=80'

   await transport.sendMail({
        from:process.env.REACT_APP_MAIL_FROM,
        to:req.body.mailTo,
        subject:"O Miller Wielding LLC",
        html: `<div style='display:flex; text-align:center'> <div style='display:grid; color:rgba(62, 111, 245, 0.938); column-gap:20px;  font-size:150%'> 
           Invoice From O Miller Wielding LLC 
           
           <button style='border-radius: 10px; background-color:rgba(62, 111, 245, 0.938); width:50%; height:100%; text-decoration:none; margin-left:25%;  border:0px;'>
            
           <a style='color:white; font-weight:700; outline:none;text-decoration:none;' href=https://www.omillerwieldinginvoice.com/pay/${mailResult}> Link to Service </a> 
            
            </button>
            
            <img style= width='300' height='300'   src='${imageLink}'/> Thank you for your business! 
            
             </div> 
            
            </div>`,
        text: `hi ` 
    }, (err, info) => {
        if (err) {
            console.log(err);
            return err;
        }
        console.log(info.response)

    });
    
    return 200
})



// process.once('SIGUSR2', function () {
//     process.kill(process.pid, 'SIGUSR2');
//   });
  
//   process.on('SIGINT', function () {
//     // this is only called on ctrl+c, not restart
//     process.kill(process.pid, 'SIGINT');
//   });


app.listen(8282, () => console.log('listening'))

