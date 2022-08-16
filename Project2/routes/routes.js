const express = require("express");
const router = express.Router();

// const records = require('../services/records.dal')

router.use(express.static("public"));

router.get("/", async (req, res) => {
  res.render("input", { status: req.app.locals.status });
});
router.get("/proc", async (req, res) => {
  res.render("proc", { status: req.app.locals.status });
});
router.get("/records", async (req, res) => {
  res.render("records", { status: req.app.locals.status });
});

// router.post('/', async (req, res) => {
//     try {
//         console.log(req.body);
//         let user = await getLoginByUsername(req.body.username);
//         //if no user fetched, message user not found
//         if( await bcrypt.compare(req.body.password, user.password)) {
//             // change using app.locals to use session or java web token (jwt)
//             req.app.locals.user = user;
//             req.app.locals.status = user.username;
//             res.redirect('/');
//         } else {
//             req.app.locals.status = 'Incorrect password was entered.'
//             res.redirect('/auth')
//         }
//     } catch (error) {
//         console.log(error);
//         res.render('503');
//         // log this error to an error log file.
//     }
// });

// // from http browser it has /auth/new
// router.get('/new', async (req, res) => {
//     res.render('register', {status: req.app.locals.status});
// });

// router.post('/new', async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         if (req.body.email && req.body.username && req.body.password ) {
//             var result = await addLogin(req.body.username, req.body.email, hashedPassword, uuid.v4());
//             //console.log('result = ' + result);
//         } else {
//             console.log('Not enough form fields completed.');
//             req.app.locals.status = 'Not enough form fields completed.'
//             res.redirect('/auth/new')
//         }
//     } catch (error) {
//         console.log(error);
//         res.render('503');
//         // log this error to an error log file.
//     } finally {
//         req.app.locals.status = 'New account created, please login.'
//         res.redirect('/auth');
//     }
// });

// router.get('/exit', async (req, res) => {
//     console.log('get /exit');
//     res.redirect('/');
// });

module.exports = router;
