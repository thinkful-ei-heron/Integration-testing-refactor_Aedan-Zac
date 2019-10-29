const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));
const playStore = require('./playstore.js');

app.get('/apps',(req,res) => {

  let results = playStore;
  let { genre, sort} = req.query;
  // If genre or sort is provided

  if (genre){
    genre.toLowerCase();
  }

  if(sort){
    sort = sort.toLowerCase();
    sort = sort.charAt(0).toUpperCase() + sort.slice(1);
    if(sort === 'Rating'){
      results.sort((a,b)=>{
        return a[sort] < b[sort] ? 1 : -1;
      });
    }
    if (sort === 'App'){
      results.sort((a,b)=>{
        return a[sort].toUpperCase() > b[sort].toUpperCase() ? 1 : -1;
      });
    }
  }
  // if (sort){
  //   results.sort((a,b)=>{
  //     return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
  //   });
  // }

  // validate the input

  // logic of sorting

  
  //   .filter(book =>
  //     book
  //       .title
  //       .toLowerCase()
  //       .includes(search.toLowerCase()));

  return res.json(results);
});

app.listen(8000, () =>{
  console.log('Server started on PORT 8000');
});