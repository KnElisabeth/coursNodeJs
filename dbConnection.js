const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'twitter';

//pour mutualiser la connexion à la db et éviter les répétitions, on déclare une variable de connexion
const dbConnection= function(parametreARappeler){
    MongoClient.connect(url, function(err, client) {
      if(err){
        return
      }
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      //tout notre CRUD fait appel à cette ligne du parametreARappeler
      //c'est pour cela que le client.close(); ne gêne pas le fonctionnement
      parametreARappeler(db); 
      client.close();              
    }); 
}

module.exports = dbConnection;