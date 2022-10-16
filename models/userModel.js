const bcrypt = require('bcrypt');
const saltRounds = 10;
const random_id = require('random-id');
let len = 30;
let pattern = 'aA0';
 
module.exports = (_db)=>{
    db = _db;
    return UserModel;
}

class UserModel {
    // sauvegarde d'un membre
    static async saveOneUser(req){
        //on vérifie si le mail existe déjà
        let user = await db.query('SELECT * FROM users WHERE email = ?', [req.body.email]);

        if(user.length > 0) {
            return {status: 501, msg: "Cet email est déjà utilisé"}
        }

        //cryptage du mdp
        let hash = await bcrypt.hash(req.body.password, saltRounds);
        let key_id = random_id(len, pattern);
        return db.query('INSERT INTO users ( first_name, last_name, role, email, phone, password, creation_timestamp, connexion_timestamp, key_id) VALUES ( ?, ?, "user", ?, ?, ?, NOW(), NOW(), ?)', [req.body.first_name, req.body.last_name, req.body.email, req.body.phone, hash, key_id])
        .then((response)=>{
            response.key_id = key_id;
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //mise à jour du status de la validation
	static async updateValidateUser(key_id){
	    let user = await db.query('UPDATE users SET validate = "yes" WHERE key_id = ?', [key_id]);
	    return user;
	}


	static async updateKeyId(email){
        let key_id = random_id(len, pattern);
        let user = await db.query('UPDATE users SET key_id = ? WHERE email = ?', [key_id, email]);
        let result = {key_id: key_id, user: user}
        return result;
	}

    //Modification du password
    static async updatePassword(newPassword, key_id){
        let hash = await bcrypt.hash(newPassword, saltRounds);
        let result = await db.query('UPDATE users SET password = ? WHERE key_id = ?', [hash, key_id]);
        return result;
    }
    
    // récupération d'un utilisateur en fonction de son email
    static async getUserByEmail(email) {
        return await db.query('SELECT * FROM users WHERE email = ?', [email])
        .then((response)=>{
            console.log('getUserByEmail',response)
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
    // récupération d'un utilisateur en fonction de son id
    static getOneUser(id) {
        let sql = 'SELECT * FROM users WHERE id = ?';
        return db.query(sql, [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err
        })
    }

    //Récupération de tous les utilisateurs
    static async getAllUsers() {
        return await db.query('SELECT * FROM users ORDER BY connexion_timestamp DESC')
    	.then((result)=>{
			return result;
		})
		.catch((err)=>{
			return err;
		})
	}

    //modification d'un user firstName, lastName, phone, email
    static async updateUser(req, id) {
        return await db.query('UPDATE users SET first_name=?, last_name=?, role=?, phone=?, email=? WHERE id=?', [req.body.first_name, req.body.last_name, req.body.role, req.body.phone, req.body.email, id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Suppression d'un user
    static async deleteUser(id) {
        let sql = 'DELETE FROM users WHERE id = ?';
	    return await db.query(sql, [id])
    	.then((result)=>{
			return result;
		})
		.catch((err)=>{
			return err;
		})
	}
}