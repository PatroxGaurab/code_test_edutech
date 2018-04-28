var mongoose = require('mongoose');
var Bot_games = mongoose.model('Bot_games');
var Tag = mongoose.model('Tag');
var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var request = require('request');
var AWS = require('aws-sdk');

module.exports.getBotgames = function(req, res) {
	//res.status(200).json({redirect_to: "hi"});
	if(req.query.tags && req.query.tags!="all"){
		var tags=req.query.tags;
	    Bot_games
	      .find({tags:tags})
	      .exec(function(err, bot_games) {

		res.status(200).json(bot_games);
	      });
	}else if(req.query.id){
	    Bot_games
	      .findById(req.query.id)
	      .exec(function(err, bot_games) {

		res.status(200).json(bot_games);
	      });
	}else{
	    Bot_games
	      .find()
	      .exec(function(err, bot_games) {

		res.status(200).json(bot_games);
	      });
	}

};

