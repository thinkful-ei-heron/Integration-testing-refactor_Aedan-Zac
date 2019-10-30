const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('common'));
const playStore = require('./playstore.js');

app.get('/apps',(req,res) => {
  //sets results equal to a copy of playstore
  let results = [...playStore];
  //destructuring
  let { genre, sort } = req.query;
  // If genre or sort are provided empty queries
  if ('sort' in req.query && !sort) {
    return res.status(400).send('Sort cannot be empty.');
  }
  if('genre' in req.query && !genre) {
    return res.status(400).send('Genre cannot be empty.');
  }
  //if sort exists
  if(sort){
    //turns sort into lowercase with uppercase first letter eg: fReD -> Fred
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
    //if it wasnt Rating or App it is an invalid sort query
    else return res.status(400).send('Must sort by Rating or App.');
  }
  //if genre exists
  if (genre){
    let genreFilter = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];
    //turns genre into lowercase with uppercase first letter eg: fReD -> Fred
    genre = genre.toLowerCase();
    genre = genre.charAt(0).toUpperCase() + genre.slice(1);

    if(genreFilter.includes(genre)) {
      results = results.filter(app=> {
        //finds any apps with genre string as a part of their Genres value
        return app.Genres.toLowerCase().includes(genre.toLowerCase());
      });
    } 
    //if not included in genre it is an invalid genre and displays acceptable values
    else return res.status(400).send(`Must be of genre ${genreFilter.join(', ')}`);
  }
  return res.json(results);
});

module.exports = app;