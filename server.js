'use strict';

const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
// require and use "multer"...

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse',function(req,res,next){
  const form=new formidable.IncomingForm();
  form.parse(req,function(err){return next(err)});
  form.on('error',function(err){return next(err)});
  form.on('file',function(name,file){    
   const retval={"name":file.name,"type":file.type,"size":file.size};
    console.log(retval);
   res.json(retval);
    next();
  });
});
// Error handler
app.use(function (err, req, res, next) {
	if (err) {
		console.log(err);
		res.status(err.status || 500)
			.type('txt')
			.send(err.message || 'SERVER ERROR');
	}
});
app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
