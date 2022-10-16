const withAuth = require('../withAuth');

module.exports = (app, db)=>{
    
	const educationModel = require('../models/EducationModel')(db)

    //Route pour récup tous les cours
    app.get('/educations/all', async (req, res, next)=>{
	    let educations = await educationModel.getAllEducations();
	    if(educations.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: educations});
	    }
	    res.json({status: 200, result: educations});
	})

    // route pour enregister un cours
    app.post('/education/save', async (req, res, next)=>{
        let education = await educationModel.saveOneEducation(req);
        if(education.code) {
            res.json({status: 500, msg:'il y a eu un problème !', result: education});
        }
        res.json({status: 200, msg: "Le cours a bien été enregistrée", result: education});
    })

     // Route pour récupérer un cours selon l'id
     app.get('/education/one/:id', (req, res, next)=>{
	    let id = req.params.id;
	    let education = educationModel.getEducationById(id);
	    if(education.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: education});
	    }
	    res.json({status: 200, result: education});
	})

	//Route pour modifier un cours selon l'id
	app.put('/education/update/:id', (req, res, next) => {
		let id = req.params.id;
		let education = educationModel.updateEducation(req, id);
		if(education.code){
			res.json({ status: 500, err: education })
		}
		res.json({ status: 200, result: education })
	})

	app.delete('/education/delete/:id', async (req, res, next)=>{
		let id = req.params.id
		let education = await educationModel.deleteEducation(id);
		
		if(education.code){
			res.json({status: 500, err: education})
		}
		res.json({status: 200, result: education})
	})
}