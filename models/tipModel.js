module.exports = (_db)=>{
    db = _db;
    return TipModel;
}

class TipModel {
    // Récup de tous les conseils
    static getAllTips() {
        return db.query('SELECT * FROM tips ORDER BY creation_timestamp DESC')
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    // sauvegarde d'un conseil
    static async saveOneTip(req){
        return await db.query("INSERT INTO tips (title, content, file, creation_timestamp) VALUES (?,?,?,now())", [req.body.title, req.body.content, req.body.file])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }    

    //récup d'un conseil en fonction de son id
    static getOneTip(id){
        return db.query('SELECT * FROM tips where id=?', [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Modification d'un conseil
    static async updateTip(req, id) {
        return await db.query("UPDATE tips SET title=?, content=?, file=? WHERE id=?", [req.body.title, req.body.content, req.body.file, id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Suppression d'un conseil
    static async deleteTip(id) {
        let sql = 'DELETE FROM `tips` WHERE id = ?';
	    return await db.query(sql, [id])
    	.then((result)=>{
			return result;
		})
		.catch((err)=>{
			return err;
		})
	}
}