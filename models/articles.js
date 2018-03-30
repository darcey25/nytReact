const mongoose	= require('mongoose');
const Schema	= mongoose.Schema;

const ArticleSchema = new Schema({
			title: 	{ 
				type: 		String, 
				unique: 	true, 
				required: 	true, 
				dropDups: 	true 
			},
			url: 	{
				type: 		String, 
				unique: 	true, 
				required: 	true, 
				dropDups: 	true
			},
			date: 	{
				type: 		Date,
				required: 	false
			}
})

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;