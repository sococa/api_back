const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET
const withAuth = require('../withAuth');
const mail = require('../lib/mailing');

module.exports = (app, db)=>{
    
	const userModel = require('../models/UserModel')(db)

	// enregistrement d'un membre
	app.post('/register', async (req, res)=>{
	    //on vérifie si l'email existe déjà
	    let check = await userModel.getUserByEmail(req.body.email)
	    //si il existe
	    if(check.length > 0){
	        //reponse json d'erreur
	        if(check[0].email === req.body.email){
    			res.json({status: 401, msg: "Email déjà utilisé!"})
    		}
	    }     
	   //on enregistre
	   let user = await userModel.saveOneUser(req);
	   
	   console.log(user)
	   if(user.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: user});
	    }
	    
	    res.json({status: 200, msg: "l'utilisateur a bien été enregistré"});
	})

	//route de validation d'un utilisateur (key_id en params)
	app.get('/validate/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        //appel de la fonction d'update de donnée
        let validate = await userModel.updateValidateUser(key_id);
        if(validate.code) {
            res.json({status: 500, msg: 'probleme', error: validate});
        }
        //afficher la réussite
        res.render('validate', {msg: "Bravo votre compte est validé"});
    })

	//gestion de la connexion des membres
	app.post('/login', async (req, res, next)=>{
		//on check si le mail de l'user correspond à un user de la bdd
		let user = await userModel.getUserByEmail(req.body.email);
		//si il renvoi un tableau vide (il n'existe pas)
		if(user.length === 0) {
			//on envoi une reponse d'erreur d'utilisateur innexistant
			res.json({status: 404, msg:"Pas d'utilisateur enregistré avec ce mail"})
		}    
	   //on compare les deux mots de passes
	   let same = await bcrypt.compare(req.body.password, user[0].password)
		//si ça correspond
		if(same){
			//on va créer une const payload on stock les valeur qu'on va glisser dans le token
			let infos = {email:user[0].email, id: user[0].id}
			//on crée le token avec sa signature secret
			let token = jwt.sign(infos, secret);
			console.log(token)
			//reponse json avec le token qu'on renvoi vers le front
			req.headers['x-access-token']
			res.json({ status: 200, token:token, user: user[0] })
		//sinon
		}else{
			//on envoi une reponse json negative 401 avec mot de pass incorrect
			res.json({status: 401, error: 'Mot de passe incorrect'})
		}
	})

	//modification d'un utilisateur
	app.put('/user/update/:id', async (req, res, next)=>{
		let userId=req.params.id;
	    //on modifie les infos de l'utilisateur
	    let user = await userModel.updateUser(req, userId)
		
		if(user.code) {
			res.json({status: 500, msg: "gros pb", err: user})
		}
	    
	    //on recup les infos d'un utilisateur
	    let newUser = await userModel.getOneUser(userId)
		
		if(newUser.code){
			res.json({status: 500, msg: "gros pb", err: newUser})
		}
	    
	    //on retourne ces infos vers le front
	    res.json({status: 200, result: user, newUser: newUser[0]})
	})

	//route de récupération de mot de passe oublié
	app.post('/forgot', async (req, res, next)=>{
        //on modifie le key_id (par sécurité)
        let result = await userModel.updateKeyId(req.body.email);
        if(result.code) {
             res.json({status: 500, msg: "nous n'avons pas pu envoyer un email", error: result});
         }
        //on récup la réponse du key_id
        let key_id = result.key_id;
        mail(
            req.body.email, 
            "changement de mot de passe", 
            "Mot de passe oublié ?", 
            'Pour modifier votre mot de passe, cliquez <a href="http://localhost:5001/changePassword/'+key_id+'">ici<a/> !'
        );
        //res json
        res.json({status: 200, msg: "email envoyé"})
    })

    //route d'affichage de la modification de mot de passe
	app.get('/changePassword/:key_id', async (req, res, next)=>{
		let key_id = req.params.key_id;
		res.render('forgot', {key_id: key_id, msg: null})
	})
    
    //route de modification de mot de passe
    app.post('/changePassword/:key_id', async (req, res, next)=>{
        let key_id = req.params.key_id;
        let msg = null
        
        if(req.body.password1 !== req.body.password2) {
            msg = "Vos deux mots de passe ne sont pas identique !";
        } else {
           let result = await userModel.updatePassword(req.body.password1, key_id);
            if(result.code) {
                msg = "le mot de passe ne s'est pas modifié !"
            } else {
                msg = "mot de passe bien modifié !"
            } 
        }
        res.render('validate', {key_id: key_id, msg: msg})
    })

	//Route de récupération de tous les utilisateurs
	app.get('/users/all' , async (req, res, next)=>{
		let users = await userModel.getAllUsers();
		
		if(users.code){
			res.json({status: 500,  msg:'il y a eu un problème !', result: users})
		}
	    res.json({ status: 200, result: users })
	})

	app.get('/logout', async (req, res, next)=> {
		req.session.destroy((err) =>{
		  // cannot access session here
		  res.redirect('/');
		})
   })

   app.delete('/user/delete/:id', async (req, res, next)=>{
		let id = req.params.id
		let user = await userModel.deleteUser(id);
		
		if(user.code){
			res.json({status: 500, err: user})
		}
		res.json({status: 200, result: user})
	})
}