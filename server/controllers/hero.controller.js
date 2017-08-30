const router = require('express').Router();

const app = require('../models/hero.model.js');
// const middleware = require('../middleware.js');

router.get('/api/heroes', (req, res) => {
  console.log('GET to /');

  const db = req.app.get('mongodb');

  app.getHeroes(db)
    .then(response => res.send({ data: response }))
    .catch((err) => {
      console.log('# err: ', err);
      const defaultMessage = 'Failed to retrieve heroes';
      const message = err.message ? err.message : defaultMessage;
      return res.status(500).send({ error: message });
    });
});

router.get('/api/heroes/:id', (req, res) => {
  const heroId = req.params.id;
  console.log(`GET to /api/heroes/ + ${heroId}`);

  app.getHero(heroId)
    .then(response => res.send({ data: response }))
    .catch((err) => {
      console.log('# err: ', err);
      const defaultMessage = 'Failed to get hero';
      const message = err.message ? err.message : defaultMessage;
      return res.status(500).send({ error: message });
    });
});

router.post('/api/heroes', (req, res) => {
  console.log('POST to /heroes');

  app.addHero(req.body)
    .then(response => res.send({ data: response }))
    .catch((err) => {
      console.log('# err: ', err);
      const defaultMessage = 'Failed to add hero';
      const message = err.message ? err.message : defaultMessage;
      return res.status(500).send({ error: message });
    });
});

router.put('/api/heroes/:id', (req, res) => {
  const heroId = req.params.id;
  console.log(`PUT to /api/heroes/ ${heroId}`);

  app.updateHero(req.body, heroId)
    .then(response => res.send({ data: response }))
    .catch((err) => {
      console.log('# err: ', err);
      const defaultMessage = 'Failed to update hero';
      const message = err.message ? err.message : defaultMessage;
      return res.status(500).send({ error: message });
    });
});

router.delete('/api/heroes/:id', (req, res) => {
  const heroId = req.params.id;
  console.log(`DELETE to /api/heroes/ ${heroId}`);

  app.removeHero(req.body, heroId)
    .then(response => res.send({ data: response }))
    .catch((err) => {
      console.log('# err: ', err);
      const defaultMessage = 'Failed to remove hero';
      const message = err.message ? err.message : defaultMessage;
      return res.status(500).send({ error: message });
    });
});

module.exports = router;
