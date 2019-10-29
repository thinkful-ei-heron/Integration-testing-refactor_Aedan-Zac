const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));
const playStore = require('./playstore.js');

app.get('/apps',(req,res) => {
  
});

app.listen(8000, () =>{
  console.log('Server started on PORT 8000');
});