//on importe la librairie nodemailer
const nodeMailer = require('nodemailer');
//on importe l'api de google
const { google } = require("googleapis");
//on récupère l'objet d'authentification du propriétaire du gmail à brancher
const OAuth2 = google.auth.OAuth2;

module.exports = (mailTo, subject, title, text) =>{
    //on instancie l'authentification qu'on pourra utiliser dans le transport du mail
    const oauth2Client = new OAuth2(
        "998907065240-7h2kse3i4k59aou7lvjtihnmsabti439.apps.googleusercontent.com", // client Id
        "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", // code secret
        "https://developers.google.com/oauthplayground",// Redirect URL
    )
    
    //envoi des identifications client.
    oauth2Client.setCredentials({
        refresh_token: "1//045QCt_cbAEXeCgYIARAAGAQSNwF-L9IroA0BW3cW9Ez_PmT__BKxobbcUk0Byr1mp3Zl-L6_Jsf2clfg5yqqdFOt66S1B_IJ8pM"
    })
    
    console.log("oauth2Client: ", oauth2Client);
    
    //création du transport du mail pret à partir (préparation)
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'pierrocarlier@gmail.com',
            clientId: "549001460398-5shjfueaasgdlrngqjndohl3l3cns0hc.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: "1//045QCt_cbAEXeCgYIARAAGAQSNwF-L9IroA0BW3cW9Ez_PmT__BKxobbcUk0Byr1mp3Zl-L6_Jsf2clfg5yqqdFOt66S1B_IJ8pM",
            accessToken: "ya29.a0ARrdaM-LuKvR-4j80bqHyWdDq3NNx5xa7LI-PizwM7Ynk29-b5djKs227PvLCBuwj-KP6NrL5yzAbri3R85sLufLcGNNnX8oTDMmUBMhWfXBZmxRJoC276xCPsASQcYqVZ4lhWdu--TkfZqciaiN2c-d1Qd_"
        }
    })
    
    //modèle du mail
    let mailOptions = {
      from: '"Desmettre-maxime-Canin" <pierrocarlier@gmail.com>', // sender address
      to: mailTo, // list of receivers
      subject: subject, // Subject line
      text: '', // plain text body
      html: '<b>'+title+'</b><p>'+text+'<p>' // html body
    };
    
    //envoi du mail avec une callback pour voir si ça a réussi
    transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              console.log("Le mail n'a pas été envoyé");
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
    });
    
}