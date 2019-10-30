const supertest = require('supertest');
const app = require('../app');
const {expect} = require('chai');

describe('App GET /apps pathway', () => {
    it('Responds with 200 and all apps if just a request to the endpoint', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('Array');
                expect(res.body.length).to.equal(20);
                expect(res.body[0]).to.be.an('Object');
                expect(res.body[0]).to.have.all.keys('App','Category','Rating','Reviews','Size','Installs','Type','Price','Content Rating','Genres','Last Updated','Current Ver','Android Ver');
            });
    });
    it('Responds with 400 and "Sort cannot be empty" if sort is provided but no value.', () => {
        return supertest(app)
            .get('/apps')
            .query({sort:''})
            .expect(400, 'Sort cannot be empty.');
    });
    it('Responds with 400 and "Genre cannot be empty" if genre is provided but no value.', () => {
        return supertest(app)
            .get('/apps')
            .query({genre:''})
            .expect(400, 'Genre cannot be empty.');
    });
    it('Responds with 400 and "Must sort by Rating or App." if sort is not of values Rating/App', () => {
        return supertest(app)
            .get('/apps')
            .query({sort: 'something invalid'})
            .expect(400, 'Must sort by Rating or App.');
    });
    it('Responds with 200 and search results if provided a valid sort value of Rating including random caplitalized letters', () => {
        return supertest(app)
            .get('/apps')
            .query({sort:'raTIng'})
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('Array');
                expect(res.body.length).to.equal(20);
                expect(res.body[0]).to.be.an('Object');
                expect(res.body[0]).to.have.all.keys('App','Category','Rating','Reviews','Size','Installs','Type','Price','Content Rating','Genres','Last Updated','Current Ver','Android Ver');
                let boolSort = true;
                let i = 0;
                while(boolSort === true && i < res.body.length-1) {
                    if(res.body[i].Rating < res.body[i+1].Rating) {
                        boolSort = false;
                    }
                    i++;
                }
                expect(boolSort).to.be.true;
            });
    });
    it('Responds with 200 and search results if provided a valid sort value of App including random caplitalized letters', () => {
        return supertest(app)
            .get('/apps')
            .query({sort:'aPp'})
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('Array');
                expect(res.body.length).to.equal(20);
                expect(res.body[0]).to.be.an('Object');
                expect(res.body[0]).to.have.all.keys('App','Category','Rating','Reviews','Size','Installs','Type','Price','Content Rating','Genres','Last Updated','Current Ver','Android Ver');
                let boolSort = true;
                let i = 0;
                while(boolSort === true && i < res.body.length-1) {
                    if(!res.body[i].App < res.body[i+1].App) {
                        boolSort = false;
                    }
                    i++;
                }
                expect(boolSort).to.be.true;
            });
    });
});