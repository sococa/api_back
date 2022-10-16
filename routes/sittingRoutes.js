const withAuth = require('../withAuth');
const moment = require('moment');

const secret = process.env.SECRET;

module.exports = (app, db)=>{
    
    const sittingModel = require('../models/sittingModel')(db)

    app.post('/sitting/save', async (req, res, next)=>{
        let sitting = await sittingModel.saveOneSitting(req);
        if(sitting.code){
            res.json({status: 500, result: sitting})
        }
        res.json({ status: 200, sitting: sitting })
    })

    app.get('/sitting/all', async (req, res, next)=>{
		let sittings = await sittingModel.getAllSittings();
		
		if(sittings.code){
			res.json({status: 500,  msg:'il y a eu un problème !', result: sittings})
		}
	    res.json({ status: 200, result: sittings })
	})

    app.get('/sitting/one/:id', async (req, res, next)=>{
		let id = req.params.id
		let sitting = await sittingModel.getOneSitting(id);
	    
	    if(sitting.code){
			res.json({status: 500, err: sitting})
		}
	    res.json({ status: 200, result: sitting[0] })
	})

	//Route pour modifier un chien
	app.put('/sitting/update/:id', async (req, res, next)=>{
		let id = req.params.id
		let sitting = await sittingModel.updateSitting(id, req);
		
		if(sitting.code){
			res.json({ status: 500, err: sitting })
		}
		res.json({ status: 200, result: sitting })
	})

    app.delete('/sitting/delete/:id', async (req, res, next)=>{
		let id = req.params.id
		let sitting = await sittingModel.deleteOneSitting(id);
		
		if(sitting.code){
			res.json({status: 500, err: sitting})
		}
	    res.json({status: 200, result: sitting})
	})
}