const express = require('express');
const AboutUs = require('../database/models/AboutUs.js');
const checkAdmin = require('../authentication/bustAndLog.js');

const router = express.Router();

// If the check fails a status of 500 will be sent and
// a log will be saved
router.param('admin', checkAdmin);

router.get('/',(req, res) => {
	AboutUs.find((err, aboutAsData) => {
		if (err) {
			console.error(`${new Date()}, AboutUs could not get retrieved. ERROR, ${err}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		//There is only one document in our Model
		aboutAsData = aboutAsData[0]
		res.send({
			description:aboutAsData.description, 
			imagesLength: aboutAsData.images.length
		});
	});
});

router.get('/image/:index',(req, res) => {
	let index = req.params.index
	AboutUs.find((err, aboutAsData) => {
		if (err) {
			console.error(`${new Date()}, AboutUs image  with index ${index} could not get retrieved. ERROR, ${err}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		//There is only one document in our Model
		aboutAsData = aboutAsData[0]
		res.send({image: aboutAsData.images[index]});
	});
});

router.post('/image/new/:admin', (req, res) => {
	let id = req.body.id
	let newImage = req.body.newImages

	AboutUs.findByIdAndUpdate(id, 
		{
			$push :{ 
				"images": { 
					$each: newImages
				}
			} 	
		},(err, aboutAsData) => {
		if (err) {
			console.error(`${new Date()}, AboutUs image  with index ${index} could not get retrieved. ERROR, ${err}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send({message: "images deleted successfully"});
	});
})


router.post('/image/delete/:admin', (req, res) => {
	let id = req.body.id
	let {imagesWithIdToDelete} = req.body

	AboutUs.findByIdAndUpdate(id, 
		{
			$pull: { images: newImage }	
		},(err, aboutAsData) => {
		if (err) {
			console.error(`${new Date()}, AboutUs image  with index ${index} could not get retrieved. ERROR, ${err}`);
			return res.status(500).send('Κάποιο σφάλμα συνέβη.');
		}
		res.send({message: "images deleted successfully"});
	});

	router.post('/update-all-fields-other-than-images/:admin', (req, res) => {
		let id = req.body.id
		let allFieldsOtherThanImages = req.body.allFieldsOtherThanImages
	
		AboutUs.findByIdAndUpdate(id, allFieldsOtherThanImages, (err, aboutAsData) => {
			if (err) {
				console.error(`${new Date()}, AboutUs image  with index ${index} could not get retrieved. ERROR, ${err}`);
				return res.status(500).send('Κάποιο σφάλμα συνέβη.');
			}
			//There is only one document in our Model
			res.send({message: "images updated successfully"});
		});
	})
})


module.exports = router;
