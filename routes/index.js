var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: ' my first work in Express','subtemplate':'students' });
});

router.get('/signup',function(req,res, next)
{
res.render('index',{title:'Student signup','subtemplate': 'signup'})
})
router.get('/login',function(req,res,next)
{
  res.render('index',{title:'Student login','subtemplate': 'login'})
})
router.get('/edit', (req,res,next) =>
{
  const params = req.query;
  console.log(params); 
  res.render('index',{title:'Edit student','subtemplate': 'editStudent', studentId: params.id})
})
module.exports = router;
