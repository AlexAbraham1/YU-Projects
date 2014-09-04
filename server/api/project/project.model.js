'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
//  author: {
//      type: mongoose.Schema.Types.ObjectId, ref: 'User'
//  },
  description: String,
  date: { type: Date, default: Date.now },
  languages: String
//  comments: [{ body: String, date: Date, active: Boolean }],
////  members: [{
////      type: mongoose.Schema.Types.ObjectId, ref: 'User'
////  }],
//  active: Boolean,
//  votes: {
//      positive: Number,
//      negative: Number
//  }
});

module.exports = mongoose.model('Project', ProjectSchema);



