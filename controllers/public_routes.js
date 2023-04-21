const router = require('express').Router();


// Middleware function to redirect a logged in user to the dashboard
// We don't want to show auth pages if they're logged in
function notLoggedIn(req, res, next) {
    if (!req.session.user_id) return res.redirect('/login');

    next();
}

// Render the Homepage view
router.get('/', (req, res) => {
    
    res.render('index');
});

router.get('/dashboard',notLoggedIn,(req, res)=>{
    
    res.render('dashboard');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register',  (req,res)=>{
    res.render('auth/register');
});

module.exports = router;






