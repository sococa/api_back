const withAuth = require('../withAuth');

module.exports = (app, db)=>{
    const tipModel = require('../models/TipModel')(db)

    //Route pour récup tous les conseils
    app.get('/tips/all', async (req, res, next)=>{
	    let tips = await tipModel.getAllTips();
	    if(tips.code) {
	        res.json({status: 500, msg:'il y a eu un problème !', result: tips});
	    }
	    res.json({status: 200, result: tips});
	})

	//Route pour enregistrer un conseil
	app.post('/tips/save', async (req, res, next)=>{
        let tip = await tipModel.saveOneTip(req);
        if(tip.code) {
            res.json({status: 500, msg:'il y a eu un problème !', result: tip});
        }
        res.json({status: 200, msg: "Le conseil a bien été enregistrée", result: tip});
    })

	//Route pour enregistrer un fichier
	app.post('/tips/file/upload', async (req, res, next) => {
		let selectedFile;
  		let uploadPath;

		//si il n'y a aucun fichier envoyé ou que ce fichier est un objet vide, on retourne une erreur
		if(!req.files || Object.keys(req.files).length === 0){
			res.json({status: 400, msg: "Le fichier n'a pas pu être récupérée"});
		}else{
		selectedFile = req.files.file;
		uploadPath = "./public/images/" + selectedFile.name
		//on sauvegarde notre image dans le dossier que l'on souhaite
		selectedFile.mv(uploadPath, function(err) {
			if (err) {
				res.json({status: 500, msg: "La photo n'a pas pu être enregistrée"})
			}else{
				console.log("selectedFile : ", selectedFile)
				res.json({status: 200, msg: 'fichier sauvegardé', url: req.files.file});				
			}
		});
		}
	});

	//Route pour modifier un conseil
	app.put('/tip/update/:id', (req, res, next)=>{
		let id = req.params.id
		let tip = tipModel.updateTip(req, id);
	    if(tip.code){
			res.json({ status: 500, err: tip })
		}
	    res.json({ status: 200, result: tip })
	})

	//Route pour supprimer un conseil
    app.delete('/tip/delete/:id', async (req, res, next)=>{
		let id = req.params.id
		let tip = await tipModel.deleteTip(id);
		
		if(tip.code){
			res.json({status: 500, err: tip})
		}
	    res.json({ status: 200, result: tip })
	})
}