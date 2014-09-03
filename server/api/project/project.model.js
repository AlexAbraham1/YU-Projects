'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  tagline: String,
  author: String,
  description: String,
  date: { type: Date, default: Date.now },
  comments: [{ body: String, date: Date, active: Boolean }],
  active: Boolean,
  meta: {
      votes: Number
    }
});

module.exports = mongoose.model('Project', ProjectSchema);
