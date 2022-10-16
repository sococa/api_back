const express = require('express')
const app = express()

require('dotenv').config() // stock les variable d'environnement dans le fichier .env
app.set('view engine', 'ejs');

let session = require('cookie-session');
let parseurl = require('parseurl');

const mysql = require('promise-mysql')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/public'));
//app.use(express.urlencoded({ extended: false }))

//Sauvergarder des fichiers dans les dossiers via un formulaire
const fileUpload = require('express-fileupload');
app.use(fileUpload({
  createParentPath: true
}));

app.set('views', './views');

app.use(session({
  secret: '8k2OhTyxY7iPNuN4eQSlc5CaVdc2ZREWXuqN7920',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}))

app.use(function (req, res, next) {
  if (!req.session.user) {
    req.session.user = null
    req.session.isLogged = false
  }

    // get the url pathname pathname est la section de chemin de l'URL, qui vient après l'hôte et avant la requête
    let pathname = parseurl(req).pathname
    //gestion des routes protégées
    let protectedPath = ["/reserver"];
    // route uniquement pour l'admin
    let adminPath = ["/admin"];
    //conditions pour les accès aux routes avec restrictions qui redirigent vers le login si il n'est pas connecté ou admin if else if else
    if((protectedPath.indexOf(pathname) !== -1 || adminPath.indexOf(pathname) !== -1) && req.session.isLogged === false) {
      res.redirect('/connexion');
     } else if (adminPath.indexOf(pathname) !== -1 && req.session.user.role !== "admin") {
       res.redirect('/');
     } else {
        next()
     }
})

console.log("session",session)

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dogRoutes = require('./routes/dogRoutes');
const educationRoutes = require('./routes/educationRoutes');
const customer_feedbackRoutes = require('./routes/customer_feedbackRoutes');
const tipRoutes = require('./routes/tipRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sittingRoutes = require('./routes/sittingRoutes');



// test de middleware
const myModule = require('./testModule')
myModule()

if(!process.env.HOST) {
	let config = require('./config')
}


// connexion BDD
const HOST = process.env.HOST
const DATABASE = process.env.DATABASE
const USER = process.env.USER
const PASSWORD = process.env.PASSWORD 
const PORT = process.env.PORT || config.db.port

console.log(HOST, DATABASE, USER, PASSWORD)

mysql.createConnection({
  host: HOST,
  database: DATABASE,
  user: USER,
  password: PASSWORD,
}).then((db) => {
  console.log('connecté à la database');
  userRoutes(app, db);
  authRoutes(app, db);
  dogRoutes(app, db);
  educationRoutes(app, db);
  customer_feedbackRoutes(app, db);
  tipRoutes(app, db);
  contactRoutes(app, db);
  adminRoutes(app, db);
  sittingRoutes(app, db);
})
.catch(err => console.log('Echec connexion BDD: ', err))


app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})