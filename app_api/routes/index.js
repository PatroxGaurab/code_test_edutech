var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlCourses = require('../controllers/courses');
var ctrlCampuschamp = require('../controllers/campuschamp');

// profile
router.get('/profile*', auth, ctrlProfile.profileRead);
router.get('/forum/profile*', auth, ctrlProfile.forumProfileRead);

//router.get('/login_external', ctrlAuth.login_external);

//router.get('/wishlist/toggle*', auth, ctrlProfile.toggleWishlist);

//router.get('/wishlist/check*', auth, ctrlProfile.isWishlisted);

// google login
router.get('/login_external/auth/google', ctrlAuth.login_external_google);

router.get('/auth/google*', ctrlAuth.login_external_callback_google);

// facebook login
router.get('/login_external/auth/facebook', ctrlAuth.login_external_facebook);
router.get('/auth/facebook*', ctrlAuth.login_external_callback_facebook);

// twitter login
router.get('/login_external/auth/twitter', ctrlAuth.login_external_twitter);
router.get('/auth/twitter*', ctrlAuth.login_external_callback_twitter);

// linkedin login
router.get('/login_external/auth/linkedin', ctrlAuth.login_external_linkedin);
router.get('/auth/linkedin*', ctrlAuth.login_external_callback_linkedin);

// Check unique username
//router.post('/username/save', auth, ctrlProfile.saveUsername);
//router.get('/username*', auth, ctrlProfile.isUsernameUnique);

// course
router.get('/courses*', ctrlCourses.getCourses);
router.get('/tags*', ctrlCourses.getTags);


// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// campuschamp
router.post('/campuschamp/apply*', ctrlCampuschamp.champApply);

module.exports = router;
