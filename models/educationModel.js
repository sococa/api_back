module.exports = (_db)=>{
    db = _db;
    return EducationModel;
}

class EducationModel {
    // Récup de tous les cours
    static getAllEducations() {
        return db.query('SELECT * FROM educations ORDER BY date DESC')
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
    // sauvegarde d'un cours
    static async saveOneEducation(req){
        return await db.query("INSERT INTO educations (problem_description, solutions, date, duration, dog_name, user_phone) VALUES (?,?,?,?,?,?)", [req.body.problem_description, req.body.solutions, req.body.date, req.body.duration, req.body.dog_name, req.body.user_phone])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    // Récupération d'un cours selon l'id
    static async getEducationById(id){
        return db.query("SELECT problem_description, solutions FROM educations where id=?", [id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Modification d'un cours selon l'id
    static async updateEducation(req, id) {
        return await db.query("UPDATE educations SET problem_description=?, solutions=?, date=?, duration=?, dog_name=?, user_phone=? WHERE id=?", [req.body.problem_description, req.body.solutions, req.body.date, req.body.duration, req.body.dog_name, req.body.user_phone, id])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    //Suppression d'un cours
    static async deleteEducation(id) {
        let sql = 'DELETE FROM educations WHERE id = ?';
        return await db.query(sql, [id])
        .then((result)=>{
            return result;
        })
        .catch((err)=>{
            return err;
        })
    }
}