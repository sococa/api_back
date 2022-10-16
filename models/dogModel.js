module.exports = (_db)=>{
    db = _db;
    return DogModel;
}

class DogModel {
    //Sauvegarde d'un chien
    static async saveDog(req){
        return await db.query("INSERT INTO dogs (dog_name, race, is_educated, user_phone) VALUES (?,?,?,?)", [req.body.dog_name, req.body.race, req.body.is_educated, req.body.user_phone])
        .then((response)=>{
            console.log("response : ", response)
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Récupération de tous les chiens
    static async getAllDogs() {
        return await db.query('SELECT * FROM dogs ORDER BY dog_name')
        .then((result)=>{
            return result;
        })
        .catch((err)=>{
            return err;
        })
    }
    
    //Récup d'un chien en fonction de son id
    static async getOneDog(id){
        return await db.query('SELECT * FROM dogs where id=?', [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    // récup de la race du chien en fonction de son id
    static async getDogRace(id){
        return await db.query('SELECT race FROM dogs where id=?', [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err
        })
    } 
    
    //Modification d'un chien
    static async updateDog(req, id) {
        return await db.query("UPDATE dogs SET dog_name=?, race=?, is_educated=? WHERE id=?", [req.body.dog_name, req.body.race, req.body.is_educated])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Suppression d'un chien
    static async deleteDog(id) {
        let sql = 'DELETE FROM dogs WHERE id = ?';
	    return await db.query(sql, [id])
    	.then((result)=>{
			return result;
		})
		.catch((err)=>{
			return err;
		})
	}

    //récupération de tous les chiens éduqués
    static async getAllDogsEducated() {
        return await db.query('SELECT * FROM dogs WHERE is_educated = 1')
        .then((result)=>{
            return result;
        })
        .catch((err)=>{
            return err;
        })
    }
}