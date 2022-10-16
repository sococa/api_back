const withAuth = require('../withAuth');

module.exports = (app, db)=>{

    const feedbackModel = require('../models/Customer_feedbackModel')(db)

    // route permettant d'enregister un feedback
    app.post('/feedback/register',  async (req, res, next)=>{
        let feedback = await feedbackModel.saveOneFeedback(req);
        if(feedback.code) {
            res.json({status: 500, msg:'il y a eu un problème !', result: feedback});
        }
        res.json({status: 200, msg: "Le retour a bien été enregistrée", result: feedback});
		next()
    })

	//Route pour récupérer tous les feedbacks
	app.get('/feedbacks/all', async (req, res, next)=>{
		let feedbacks = await feedbackModel.getAllFeedbacks();
		if(feedbacks.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: feedbacks});
	    }
	    res.json({status: 200, result: feedbacks});
	})

    // Route pour récupérer un feedback selon l'id
    app.get('/feedback/one/:id', async (req, res, next)=>{
	    let id = req.params.id;
	    let feedback = await feedbackModel.getOneFeedback(id);
	    if(feedback.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: feedback});
	    }
	    res.json({status: 200, result: feedback});
	})

	//Route pour modifier un feedback
	app.put('/feedback/update/:id', async (req, res, next)=>{
		let id = req.params.id
		let feedback = await feedbackModel.updateFeedback(req, id);
	    
	    if(feedback.code){
			res.json({ status: 500, err: feedback })
		}
	    res.json({ status: 200, result: feedback })
	})

	// Route pour supprimer un feedback
	app.delete('/feedback/delete/:id', async (req, res, next)=>{
		let id = req.params.id
		let feedback = await feedbackModel.deleteOneFeedback(id);
		
		if(feedback.code){
			res.json({status: 500, err: feedback})
		}
	    res.json({ status: 200, result: feedback })
	})
}