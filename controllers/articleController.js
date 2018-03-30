const db = require("../models");

module.exports = {
  	index: function(req, res) {
        var query;
        if (req.query) {
            query = req.query;
        }
        else {
            query = req.params.id ? { _id: req.params.id } : {};
        }
        db.find(query)
            .then(function(doc) {
                res.json(doc);
            }).catch(function(err) {
                res.json(err);
            });
    },
  	// This method handles creating new articles
    create: function(req, res) {
      	const savedArticle 	= {};
      	savedArticle.title 	= req.body.article.headline.main;
    	  savedArticle.url	= req.body.article.web_url;
    	  // savedArticle.date	= req.body.article.pub_date;  
        savedArticle.date = Date.now();
        db.create(savedArticle).then(function(doc) {
          	res.json(doc);
        }).catch(function(err) {
          	res.json(err);
        });
    },
      // This method handles deleting articles
    destroy: function(req, res) {
        db.remove({
          _id: req.params.id
        }).then(function(doc) {
          res.json(doc);
        }).catch(function(err) {
          res.json(err);
        });
    }
};