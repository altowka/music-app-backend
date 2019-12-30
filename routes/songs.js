const express = require('express');
const router = express.Router();
const {Song, validate} = require('../models/song'); 

router.get('/', async (req, res) => {
    const songs = await Song.find().sort('name');
    res.send(songs);
  });
  
router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    const song = new Song({ 
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    });
    await song.save();
    
    res.send(song);
  });
  
  
  router.delete('/:id', async (req, res) => {
    const song = await Song.findByIdAndRemove(req.params.id);
  
    if (!song) return res.status(404).send('The song with the given ID was not found.');
  
    res.send(song);
  });
  
  router.get('/:id', async (req, res) => {
    const song = await Song.findById(req.params.id);
  
    if (!song) return res.status(404).send('The song with the given ID was not found.');
  
    res.send(song);
  });
  
  module.exports = router; 