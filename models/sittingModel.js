module.exports = (_db) => {
	db = _db
	return SittingModel
}

class SittingModel{

    static getAllSittings() {
	    return db.query('SELECT * FROM dog_sitting ORDER BY start ASC')
    	.then((result)=>{
			return result;
		})
		.catch((err)=>{
			return err;
		})
	}
 
    static saveOneSitting(req) {
        return db.query('INSERT INTO dog_sitting (start, end, creationTimestamp, user_phone) VALUES (?,?, NOW(), ?)', [req.body.start, req.body.end, req.body.user_phone])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
			console.log('problème dans le model')
            return err;
        })
    } 

    static getOneSitting(id){
        let sql = 'SELECT start, end, creationTimestamp FROM dog_sitting WHERE id = ?';
        return db.query(sql, [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err
        })
    }

    static async updateSitting(req, id) {
        return await db.query("UPDATE sittings SET start=?, end=?, user_phone=? WHERE id=?", [req.body.start, req.body.end, req.body.user_phone])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    static deleteOneSitting(id) {
        let sql = 'DELETE FROM dog_sitting WHERE id = ?';
	    return db.query(sql, [id])
    	.then((result)=>{
			return result;
		})
		.catch((err)=>{
			return err;
		})
	}
}