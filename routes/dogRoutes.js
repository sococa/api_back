const fs = require('fs');
const withAuth = require('../withAuth');

module.exports = (app, db)=>{
    
	const dogModel = require('../models/DogModel')(db)

    // route permettant d'enregister un chien
    app.post('/dog/register', async (req, res)=>{
        let dog = await dogModel.saveDog(req);
        if(dog.code) {
			
            res.json({status: 500, msg:'il y a eu un problème !', result: dog});
			
        }
        res.json({status: 200, msg: "votre chien a bien été enregistrée"});
		console.log('res', res)
    })

	//Route de récupération de tous les chiens
	app.get('/dogs/all' , async (req, res, next)=>{
		let dogs = await dogModel.getAllDogs();
		
		if(dogs.code){
			res.json({ status: 500,  msg:'il y a eu un problème !', result: dogs })
		}
		res.json({ status: 200, result: dogs })
	})

    // Route pour récupérer un chien selon l'id
    app.get('/dog/one/:id', async (req, res, next)=>{
	    let id = req.params.id;
	    let dog = await dogModel.getOneDog(id);
	    if(dog.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: dog});
	    }
	    res.json({status: 200, result: dog});
	})

    // Route pour récupérer la race d'un chien selon son id
    app.get('/dog/one/race/:id', async (req, res, next)=>{
	    let id = req.params.id;
	    let race = await dogModel.getDogRace(id);
	    if(race.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: race});
	    }
	    res.json({status: 200, result: race});
	})

	//Route pour modifier un chien
	app.put('/dog/update/:id', async (req, res, next)=>{
		let id = req.params.id
		let dog = await dogModel.updateDog(id, req);
	    
	    if(dog.code){
			res.json({ status: 500, err: dog })
		}
	    res.json({ status: 200, result: dog })
	})
	
	//supprimer un chien
	app.delete('/dog/delete/:id', async (req, res, next)=>{
		let id = req.params.id
		let dog = await dogModel.deleteDog(id);
		
		if(dog.code){
			res.json({status: 500, err: dog})
		}
		res.json({status: 200, result: dog})
	})

	//Tous les chiens éduqués
	app.get('/dogs/educated' , async (req, res, next)=>{
		let dogs = await dogModel.getAllDogsEducated();
		
		if(dogs.code){
			res.json({ status: 500,  msg:'il y a eu un problème !', result: dogs })
		}
		res.json({ status: 200, result: dogs })
	})

}