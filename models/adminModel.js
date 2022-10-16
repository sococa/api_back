const bcrypt = require('bcrypt');
const saltRounds = 10;
const random_id = require('random-id');
let len = 30;
let pattern = 'aA0';

module.exports = (_db)=>{
    db = _db;
    return AdminModel;
}

class AdminModel {
    static async saveUserByAdmin(req){
        //on vérifie si le mail existe déjà
        let user = await db.query('SELECT * FROM users WHERE email = ?', [req.body.email]);

        if(user.length > 0) {
            return {status: 501, msg: "Cet email est déjà utilisé"}
        }

        //cryptage du mdp
        let hash = await bcrypt.hash(req.body.password, saltRounds);
        let key_id = random_id(len, pattern);
        return db.query('INSERT INTO users ( first_name, last_name, role, email, phone, password, creation_timestamp, connexion_timestamp, key_id) VALUES ( ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)', [req.body.first_name, req.body.last_name, req.body.role, req.body.email, req.body.phone, hash, key_id])
        .then((response)=>{
            response.key_id = key_id;
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    static async updateUserByAdmin(req, userId) {
        return await db.query('UPDATE users SET first_name=?, last_name=?, role=?, email=?, phone=? WHERE id=?', [req.body.first_name, req.body.last_name, req.body.role, req.body.phone, req.body.email, userId])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
}