'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: String,
  author: {
    _id: {type: Schema.ObjectId, ref: 'User' },
    name: String,
    email: String
  },
  description: String,
  date: { type: Date, default: Date.now },
  languages: [String],
  comments: [
    {
      body: String,
      date: { type: Date, default: Date.now },
      by: {
        _id: {type: Schema.ObjectId, ref: 'User' },
        name: String,
        email: String
      }
    }
  ],
  members: [
    {
      _id: {type: Schema.ObjectId, ref: 'User' },
      name: String,
      email: String
    }
  ],
  active: {type: Boolean, default: false },
  votes: Number
});

module.exports = mongoose.model('Project', ProjectSchema);



