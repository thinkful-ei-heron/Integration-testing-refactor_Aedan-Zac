const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));
const playStore = require('./playstore.js');

app.get('/apps',(req,res) => {

  let results = playStore.map(i => i);

  let { genre, sort} = req.query;
  // If genre or sort is provided
  if ('sort' in req.query && !sort) {
    return res.status(400).send('Sort cannot be empty.');
  }
  if('genre' in req.query && !genre) {
    return res.status(400).send('Genre cannot be empty.');
  }

  if(sort){
    sort = sort.toLowerCase();
    sort = sort.charAt(0).toUpperCase() + sort.slice(1);
    if(sort === 'Rating'){
      results.sort((a,b)=>{
        return a[sort] < b[sort] ? 1 : -1;
      });
    }
    else if (sort === 'App'){
      results.sort((a,b)=>{
        return a[sort].toUpperCase() > b[sort].toUpperCase() ? 1 : -1;
      });
    }
    else return res.status(400).send('Must sort by Rating or App.');
  }

  if (genre){
    let genreFilter = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    genre = genre.toLowerCase();
    genre = genre.charAt(0).toUpperCase() + genre.slice(1);

    if(genreFilter.includes(genre)) {
      results = results.filter(app=> {
        return app.Genres.toLowerCase().includes(genre.toLowerCase());
      });
    } else return res.status(400).send(`Must be of genre ${genreFilter.join(', ')}`);
  }

  return res.json(results);
});

app.listen(8000, () =>{
  console.log('Server started on PORT 8000');
});