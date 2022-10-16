const withAuth = require('../withAuth');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (app, db)=>{
    const adminModel = require('../models/AdminModel')(db)
    const userModel = require('../models/UserModel')(db)

    app.get("/admin", (req, res) => {
        res.render("admin", { msg:null })
    });

    // enregistrement d'un membre
	app.post('/admin/registerUser', async (req, res)=>{
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
	   let user = await adminModel.saveUserByAdmin(req);
	   
	   if(user.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: user});
	    }
	    
	    res.json({status: 200, msg: "l'utilisateur a bien été enregistré"});
	})

	//modification d'un utilisateur
	app.put('/admin/updateUser/:id', async (req, res, next)=>{
		let userId=req.params.id;
	    //on modifie les infos de l'utilisateur
	    let user = await userModel.updateUserByAdmin(req, userId)
		
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
}