var express = require('express');
var router = express.Router();

//les noms de variables sont prédéfinis et obligatoires pour ce driver
const ObjectId = require('mongodb').ObjectId;
const dbConnection=require('../dbConnection');

/*
//READ avec connexion à la db 
//res comme response
router.get('/', function(req, res, next) {
  //CONNECTER NODEJS A LA DB
  //bien rester dans le .connect pour être en lien avec la db
  MongoClient.connect(url, function(err, client) {
    if(err){
      return
    }
    console.log("Connected successfully to server");
    //la réussite (et donc le console.log) s'affiche dans le terminal puisque l'on est côté serveur
    const db = client.db(dbName);

    //DEFINIR LA FONCTION
    const findTweets = function(db, callbackTweets) {
      // Get the documents collection
      const collection = db.collection('tweet');
      // Find some documents
      //le .toArray transforme directement mon "fetchAll" en tableau
      collection.find({}).toArray(function(err, tweets) {
        if(err){
          return
        }
        console.log("J'ai trouvéééééé");
        //RECUPERER LES TWEETS
        console.log(tweets)
        callbackTweets(tweets);

        //AFFICHER LES TWEET
        res.render('index', { title: 'Mes Tweets du jour !',posts:tweets });
      });
    }
    //APPELER LA FONCTION
    //là encore la réussite de l'opération n'est encore visible que dans le terminal
    findTweets(db, function(tweets) {
      client.close();
    });   
  }); 
});
*/

//READ avec rappel de dbConnection 
router.get('/', function(req, res, next) {

  console.log(req.session)
  //vérifie que ma session a fonctionné

  const findTweets = function(db, callbackTweets) {
    const collection = db.collection('tweet');
    collection.find({}).toArray(function(err, tweets) {
      if(err){
        return
      }
      console.log("J'ai trouvéééééé");
      callbackTweets(tweets);
    });
  }

  dbConnection(function(db){

    findTweets(db, function(tweets) {
      console.log(tweets);
      res.render('index', { title: 'Mes Tweets du jour !',posts:tweets , user:req.session.mee});
    });
  })       
}); 


//SEARCH
router.get('/search', function(req, res, next) {

  console.log(req.query)
  //récupérer les données de l'input car tout ce qui suit le ? est appelé le queryString

  const regex=new RegExp('.*'+req.query.input+'.*','i')
  //n'ipmorte quel caractère avant et après notre requête
  //le i empêche la sensibilité à la casse
  //l'objet RegExp fait partie du langage JS, il est donc reconnu

  dbConnection(function(db){
  
      db.collection('tweet').find({tweet:regex}).toArray(function(err,tweets){

        console.log(tweets)
        //récupérer les tweets correspondant au filtre précedemment déterminé

        res.render('list', {posts:tweets}, function (err, duHtml){
          res.json({jelAppelleCommeJeVeux:duHtml}).end()
        //j'affiche le html récupéré en fonction du filtre (dans le terminal) et je le renvoie en json
          
        })
      })     
  })       
});

module.exports = router;
