const mongoose = require('mongoose');
const HeroSchema = require('../schema/hero.schema.js');
// const config = require('../../config/config.js');

mongoose.Promise = global.Promise;

const Hero = mongoose.model('Hero', HeroSchema);

function getHeroes() {
  return new Promise((resolve, reject) => {
    Hero.find({})
      .exec()
      .then(data => resolve(data))
      .catch(err => reject('Error has occured: ', err));
  });
}

function addHero(details) {
  return new Promise((resolve, reject) => {
    // Hero.create(details) - another way to create document
    const hero = new Hero({
      name: details.name,
    });
    hero.save()
      .then(data => resolve(data))
      .catch(err => reject('Error has occured: ', err));
  });
}

function getHero(param) {
  return new Promise((resolve, reject) => {
    Hero.findOne({
      _id: param,
    })
      .exec()
      .then(data => resolve(data))
      .catch(err => reject('Error has occured: ', err));
  });
}

function updateHero(item, param) {
  return new Promise((resolve, reject) => {
    Hero.findOneAndUpdate({
      _id: param,
    }, { $set: { name: item.name } }, { upsert: true }, (err, data) => {
      if (err) return reject('Error has occured: ', err);
      return resolve(data);
    });
  });
}

function removeHero(item, param) {
  return new Promise((resolve, reject) => {
    Hero.findOneAndRemove({
      _id: param,
    }, (err, data) => {
      if (err) return reject('Error has occured: ', err);
      return resolve(data);
    });
  });
}

module.exports = {
  getHeroes,
  addHero,
  getHero,
  updateHero,
  removeHero,
};
