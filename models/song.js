//Joi - ułatwia walidację
const Joi = require('joi');
const mongoose = require('mongoose');

const Song = mongoose.model('Songs', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, //zwraca string bez białych znaków
    minlength: 2,
    maxlength: 255
  },
  author: {
    type: String,
    required: true,
    trim: true, 
    minlength: 3,
    maxlength: 255
  },
  src: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  }
 
}));

function validateSong(song) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    author: Joi.objectId().required(),
    src: Joi.number().min(0).required()
  };

  return Joi.validate(song, schema);
}

exports.Song = Song; 
exports.validate = validateSong;