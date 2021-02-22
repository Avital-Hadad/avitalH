const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController')

router.get('/getHistoryForUser/:id', historyController.GetHistoryForUser);
router.post('/addHistory/:date/:nameCity/:weather/:idUser', historyController.AddHistory);

module.exports = router;


