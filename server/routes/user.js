const { Router } = require('express');
const { getOtp, userRegister, login } = require('../controllers/userController');
const upload = require('../middleware/file-upload');
const router = Router();

router.post('/get_otp', getOtp)
router.post('/verify_otp', upload.single('myFile'), userRegister)
router.post('/login', login)

module.exports = router;