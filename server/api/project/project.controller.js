'use strict';

var _ = require('lodash');
var Project = require('./project.model');
var User = require('../user/user.model');
var auth = require('../../auth/auth.service');
var request = require('request');
var email = require('../../components/email');

// Get list of projects
exports.index = function (req, res) {
  var options = _.omit(req.query, 'req');
  req.query.req = req.query.req || '';
  Project.find(options, req.query.req, function (err, projects) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, projects);
  });
};

// Get a single project
exports.show = function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (err) {
      return handleError(res, err);
    }
    if (!project) {
      return res.send(404);
    }
    return res.json(project);
  });
};

// Creates a new project in the DB.
exports.create = function (req, res) {
  var languages = _.flatten(req.body.languages, 'text');
  var newProject = new Project({
    name: req.body.name,
    author: req.body.author,
    members: req.body.members,
    description: req.body.description,
    languages: languages,
    votes: 0
  });


  newProject.save(function (err, project) {
    if (err) return handleError(res, err);
    User.find({'role': 'admin'}, function (err, admins) {
      if (err) return handleError(res, err);
      _.forEach(admins, function (admin) {
        email.sendEmail({
          subject: 'New project has been added',
          to: admin.name + '<' + admin.email + '>',
          html: email.newProjectHTML
        });
      });
    });
    res.json(201, project);
  });
};

// Updates an existing project in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Project.findById(req.params.id, function (err, project) {
    if (err) {
      return handleError(res, err);
    }
    if (!project) {
      return res.send(404);
    }

    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, project);
    });
  });
};


// Deletes a project from the DB.
exports.destroy = function (req, res) {
  Project.findByIdAndRemove(req.params.id, function (err, project) {
    if (err) return res.send(500, err);
    return res.send(204);
  });
};

exports.addComment = function (req, res) {
  var comment = req.body;
  var expletiveAPI = "http://www.purgomalum.com/service/json?text=";
  request.get(expletiveAPI + req.body.body, function (error, response, body) {
    if (!error && response.statusCode == 200 && !body.error) {
      comment.body = JSON.parse(body).result;
      Project.findById(req.params.id, function (err, project) {
        if (err) {
          return handleError(res, err);
        }
        if (!project) {
          return res.send(404);
        }
        project.comments.push(comment);
        project.save(function (err) {
          if (err) {
            return handleError(res, err);
          }
          return res.json(200, comment);
        });
      });
    } else {
      res.send(500);
    }
  });
};

exports.deleteComment = function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (err) {
      return handleError(res, err);
    }
    if (!project) {
      return res.send(404);
    }
    var userComment = _.find(project.comments, function (com) {
      return com._id == req.params.commentId;
    });
    var idx = project.comments.indexOf(userComment);
    if (idx > -1) {
      project.comments.splice(idx, 1);
    }
    project.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

exports.addMember = function (req, res) {
  var member = req.body;
  Project.findById(req.params.id, function (err, project) {
    if (err) {
      return handleError(res, err);
    }
    if (!project) {
      return res.send(404);
    }
    project.members.push(member);
    project.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, member);
    });
  });
};

exports.deleteMember = function (req, res) {
  Project.findById(req.params.id, function (err, project) {
    if (err) {
      return handleError(res, err);
    }
    if (!project) {
      return res.send(404);
    }
    var member = _.find(project.members, function (com) {
      return com._id == req.params.memberId;
    });
    var idx = project.members.indexOf(member);
    if (idx > -1) {
      project.members.splice(idx, 1);
    }
    project.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
