const nodemailer = require('nodemailer')

module.exports = (app, db)=>{

    app.get("/contact", (req, res) => {
        res.render("contact", { msg:null })
    });

    app.post("/envoi", (req, res) => {
        const output = `
        <p>Tu as un nouveau message</P>
        <h3>Détails du contact</h3>
        <ul>
            <li>Email: ${req.body.email}</li>
            <li>Sujet: ${req.body.subject}</li>
            <li>Prénom: ${req.body.firstname}</li>
            <li>Nom: ${req.body.lastname}</li>
            <li>Téléphone: ${req.body.phone}</li>
        </ul>
        <p>message: ${req.body.message}</p>
        `;
        let transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure: true,
            auth: {
                user: 'pierrocarlier@gmail.com',
                pass: 'Ab@147896325'
            },
            tls:{
                rejectUnauthorized:false
            }
        })
    
    let mailOptions = {
        from: "'Mail de DMC' <pierrocarlier@gmail.com>",
        to: 'pierrocarlier@gmail.com',
        subject:'Message venant de DMC.com',
        text:'',
        html: output
    };
    //chemin d'envoi du mail
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log('erreur');
            return console.log(error);
        }
        console.log('Message sent: ', info.messageId);
        res.render('contact', {msg:'email  envoyé'})
    })
    })
}