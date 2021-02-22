const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController')

router.get('/getUserByDetails/:userName/:password',userController.GetUserByDetails);
router.post('/addNewUser/:userName/:password',userController.AddNewUser);

module.exports = router;


