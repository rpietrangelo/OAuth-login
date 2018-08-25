const router = require('express').Router();
const passport = require('passport');

const authCheck = (req, res, next) => {
    if(!req.user){
        // if user is not logged in
        next();
    } else{
        //if logged in
        res.redirect('/');
    }
}

//auth login
router.get('/login', authCheck,  (req, res) => {
    res.render('login');
})

//auth logout
router.get('/logout', (req, res) => {
    //handle with passport
    req.logout();
    res.redirect('/');
})

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback route for google (redirect)
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    //res.send(req.user);
    res.redirect('/profile/');
})

module.exports = router;