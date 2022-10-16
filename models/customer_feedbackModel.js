module.exports = (_db)=>{
    db = _db;
    return Customer_feedbackModel;
}

class Customer_feedbackModel {
   // sauvegarde d'un feedback
   static async saveOneFeedback(req){
    return db.query("INSERT INTO customer_feedback (comment, note, creation_timestamp, dog_name, user_phone, user_firstname) VALUES (?,?,NOW(),?,?,?)", [req.body.comment, req.body.note, req.body.dog_name, req.body.user_phone, req.body.user_firstname])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Récupération de tous les feedbacks
    static async getAllFeedbacks(){
        return db.query('SELECT * FROM customer_feedback ORDER BY creation_timestamp DESC')
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //récupération d'un feedback en fonction de son id
    static async getOneFeedback(id){
        return db.query('SELECT * FROM customer_feedback where id=?', [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Modification d'un feedback
    static async updateFeedback(req, id) {
        return db.query('UPDATE customer_feedback SET comment=?, note=?, dog_name=?, user_phone=?, user_firstname=? WHERE id=?', [req.body.comment, req.body.note, req.body.dog_name, req.body.user_phone, req.body.user_firstname])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Suppression d'un feedback
    static async deleteOneFeedback(id) {
        let sql = 'DELETE FROM customer_feedback WHERE id = ?';
	    return await db.query(sql, [id])
    	.then((result)=>{
			return result;
		})
		.catch((err)=>{
			return err;
		})
	}
}