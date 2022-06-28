/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');

const request = require('supertest');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
 
    id:"ARG",
    name:"argentina",
    imagen:"url",
    continente:"americas",
    capital:"cordoba",
    subregion:"sur america",
    area: 5000,
    poblacion:10000,
    tours:[{name:"comer"}]
  }

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(country)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
  it("validacion busqueda por id del pais", done =>{
    request(agent)
    agent.get("/countries/ARG")
    .set('Accept','application/json')
    .expect('Content-Type',/json/)
    .expect(200,done)
    .expect('{"id":"ARG","name":"argentina","imagen":"url","continente":"americas","capital":"cordoba","subregion":"sur america","area":5000,"poblacion":10000}')
  })
  it("validacion busqueda por nombre", done =>{
    request(agent)
    agent.get("/countries?name=argentina")
    .set('Accept','application/json')
    .expect('Content-Type',/json/)
    .expect(200,done)
    .expect('[{"id":"ARG","name":"argentina","imagen":"url","continente":"americas","capital":"cordoba","subregion":"sur america","area":5000,"poblacion":10000,"tours":[]}]')
  })
  it("validacion crear tour", done =>{
    const data = {
      name:"comer",
      dificultad:4,
      duracion:2,
      pais:"argentina",
      temporada:"verano"
    }
    request(agent)
    agent.post("/tour")
    .send(data)
    .expect(200,done)
  })


});

