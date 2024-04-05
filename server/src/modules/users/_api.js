const express = require('express');
const { postUser, loginUser, verify, forgotPassword, forgotPassword2, GetUser, Is_admin, GetOneUser, userme } = require('./_controllers');
const isLoggedIn = require('../../shared/auth/is-loggedin');

const router = express.Router();

router.post('/', postUser);
router.get('/is_admin',isLoggedIn, Is_admin);
router.get('/me',isLoggedIn, userme);
router.get('/', GetUser);
router.post('/verify',verify );
router.post('/login',loginUser)
router.post('/forgot1',forgotPassword)
router.post('/forgot2',forgotPassword2)
router.get('/:id', GetOneUser);
module.exports = router;
