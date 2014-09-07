'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  author: {
      name: String,
      email: String
  },
  description: String,
  date: { type: Date, default: Date.now },
  languages: [String],
//  comments: [{
//      body: String,
//      date: Date,
//      active: Boolean,
//      by: {
//          name: String,
//          email: String
//      }
//  }],
  members: [{
      name: String,
      email: String
  }],
  active: {type: Boolean, default: false },
  votes: {
      positive: Number,
      negative: Number
  }
});

module.exports = mongoose.model('Project', ProjectSchema);



