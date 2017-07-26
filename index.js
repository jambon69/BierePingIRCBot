var fs = require('fs');
var feed = require("feed-read");

var irc = require('irc');
var client = new irc.Client('irc.hackerzvoice.net', 'BierePing', {
	debug: false,
	channels: ['#rtfm']
});

client.addListener('message', function (from, to, message) {
	if(message == "!help") {
		client.say(to, fs.readFileSync('help.txt', 'utf8'));
	}
	if(message == "!events") {
		client.say(to, fs.readFileSync('events.txt', 'utf8'));
	}
	if(message == "!krebson") {
		feed("https://krebsonsecurity.com/feed/", function(err, articles) {
			articles.forEach(function(article) {
				client.say(to, article.title + " # LINK : " + article.link);
			});
		});
	}
	if(message == "!hackernews") {
		feed("https://news.ycombinator.com/rss", function(err, articles) {
			articles.forEach(function(article) {
				client.say(to, article.title + " # LINK : " + article.link);
			});
		});
	}
	if(message == "!ezine") {
		var lines = fs.readFileSync('ezines.txt', 'utf8');
		lines = lines.split( '\n' );
		var line = lines[Math.floor(Math.random()*lines.length)];
		client.say(to, line);
	}
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});