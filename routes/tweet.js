var express = require('express');
var router = express.Router();

//les noms de variables sont prédéfinis et obligatoires pour ce driver
const ObjectId = require('mongodb').ObjectId;
const dbConnection=require('../dbConnection');
const MongoClient = require('mongodb').MongoClient;

/*
//CREATE avec connexion à la db
router.post('/tweet', function(request, response, next) {
  console.log(request.body.messageAjoute)
  //CONNECTER NODEJS A LA DB
  //bien rester dans le .connect pour être en lien avec la db
  MongoClient.connect(url, function(err, client) {
    if(err){
      return
    }
    console.log("on est connectééééé");
    //la réussite (et donc le console.log) s'affiche dans le terminal puisque l'on est côté serveur
    const db = client.db(dbName);

    //DEFINIR LA FONCTION
    db.collection('tweet').insertOne({
      tweet:request.body.messageAjoute,
      user:{
        id:new ObjectId("5e1443cfce56c911d8c2b9cc"),
        //instancier ObjectId en début de page par le biais de mongoDB
        name:'toto',
      },
      date:new Date(),
    });
    client.close();
  }); 
});
*/

//CREATE avec simple rappel de dbConnection 
//le /tweet de la route est déjà défini à la racine
router.post('/', function(request, response, next) {

    console.log(request.body.messageAjoute)
  
    dbConnection(function(db){
      db.collection('tweet').insertOne({
        tweet:request.body.messageAjoute,
        user:{
          id:request.session.mee._id,
          //instancier ObjectId en début de page par le biais de mongoDB
          name:request.session.mee.name,
        },
        date:new Date(),
      });
    })
  });

//UPDATE partie 1 ==> edit
router.get('/:id', function(req, res, next){
    //je récupère les paramètres liés à l'id correspondant à ma requête
    console.log(req.params.id)
    //à convertir en ObjectId 

    dbConnection(function(db){
        db.collection('tweet').findOne({_id:new ObjectId(req.params.id)},null,function(err, editTweet){
            if(err){
                return
            }
            console.log(editTweet) 
            res.render('edit', { theTweet:editTweet}); 
        })   
    })
})

//UPDATE partie 2 ==> update
router.put('/:id', function(req, res, next){
    //je récupère les paramètres liés à l'id correspondant à ma requête
    console.log(req.params.id)

    dbConnection(function(db){
        db.collection('tweet').updateOne({
            _id:new ObjectId(req.params.id)},
            {
            $set:{tweet:req.body.messageModifie}
        })
            res.end() 
    })
    // 3 éléments dans le update
    // 1==> le paramètre à modifier
    // 2==> la modification
    // 3==> clôre le processus
})

/************************************************************* */

// //CREATE comments
// router.get('/:id/comments', function(req, res, next){

//   let comments=[]

//   dbConnection(function(db){

//       db.collection('tweet').findOne({_id:new ObjectId(req.params.id)},null,function(err, tweet){
//         tweet.comments.forEach(function (comment){

//           db.collection('tweet').findOne({_id:comment},null,function(err, tweetComment){
//             comments.push(tweetComment)
//           })

//         }); 
//           res.render('comments', { theComment:comments}); 
//       })   
//   })
// })

// //CREATE comments
// router.get('/:id/comments', function (req, res, next) {
//   let comments = []
//   MongoClient.connect(url, function (err, client) {
//     if (err) {
//       return
//     }
//     console.log('Connected successfully to server')

//     const db = client.db(dbName)

//       db.collection('tweets')
//         .findOne({_id: new ObjectId(req.params.id)}, null, function (err, tweet) {
//           tweet.comments.forEach(function (comment) {
//             db.collection('tweets')
//               .findOne({_id: comment}, null, function (err, tweetComment) {
//                 console.log(err)
//                 console.log(tweetComment)
//                 comments.push(tweetComment)
//               })
//           })

//           console.log(comments)
//           res.render('comments', {comments: comments})
//         })
//     // client.close()
//   })
// })

// const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://localhost:27017'
// const dbName = 'twitter'

// router.get('/:id/comments', function (req, res, next) {
//   let comments = []
//   MongoClient.connect(url, function (err, client) {
//     if (err) {
//       return
//     }
//     console.log('Connected successfully to server')

//     const db = client.db(dbName)

//       db.collection('tweets')
//         .findOne({_id: new ObjectId(req.params.id)}, null, function (err, tweet) {
//           tweet.comments.forEach(function (comment) {
//             db.collection('tweets')
//               .findOne({_id: comment}, null, function (err, tweetComment) {
//                 console.log(err)
//                 console.log(tweetComment)
//                 comments.push(tweetComment)
//               })
//           })

//           console.log(comments)
//           res.render('comments', {comments: comments})
//         })
//     // client.close()
//   })
// })

// router.post('/:id/comments', function (req, res, next) {
//   MongoClient.connect(url, function (err, client) {
//     if (err) {
//       return
//     }
//     console.log('Connected successfully to server')

//     const db = client.db(dbName)
//     db.collection('tweets')
//       .insertOne({
//         tweet: req.body.comment,
//         user: {
//           id: req.session.user._id,
//           name: req.session.user.name,
//           avatar: req.session.user.avatar
//         },
//         date: new Date(),
//         likes: [],
//         retweets: [],
//         comments: []
//       }, null, function (err, result) {
//       db.collection('tweets')
//         .updateOne({_id: new ObjectId(req.params.id)}, {$push: {comments: result.insertedId}})
//         res.end()
//       })
//   })
// })

// commetns.twig

// {% extends 'layout.twig' %}

// {% block body %}
//     {% for comment in comments %}
//         <div class="row">
//             <div class="col-auto">
//                 {{ comment.tweet }}
//             </div>
//             <div class="col-auto">
//                 {{ comment.date | date('d/m/Y') }}
//             </div>
//         </div>
//     {% endfor %}
//     <form method="post">
//         <input type="text"name="comment">
//         <button type="submit">Envoyer</button>
//     </form>
// {% endblock %}



module.exports = router;

































