var twilio = require('twilio'),
    client = twilio('AC7bf377a64795b6a35ad94cac1b1f904c', '8231cbacaa085bec696b0d180da146b3'),
    cronJob = require('cron').CronJob;
 
var express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
 
var Firebase = require('firebase'),
    usersRef = new Firebase('{https://moodbuddy-c5dae-default-rtdb.firebaseio.com/}/Users/');
 
var numbers = [];
var mood = [] 
var activated = false;


usersRef.on('child_added', function(snapshot) {
  numbers.push( snapshot.val() );
  
  console.log( 'Added number ' + snapshot.val() );
  phoneNumberMoodEntry = [snapshot.val(), 0]
  mood.push(phoneNumberMoodEntry)
});


function resetMood() {
  for (i = 0; i < mood.length; i++) 
  {
    mood[i] = [numbers[i] , 0]
  }
};
 
var textJob = new cronJob( '*/1 * * * *', function(){
  for( var i = 0; i < numbers.length; i++ ) {
    client.sendMessage( { to:numbers[i], from:'+16475594970', body:'Hello! moodBuddy wants you to know that your new week has started! remember to message moodBuddy every day how you are feeling 😊.'}, function( err, data ) {
      console.log( data.body );
        

    

    });
  }
},  null, true);




var textJob2 = new cronJob( '*/2 * * * *', function(){
  for( var i = 0; i < numbers.length; i++ ) {

    var score = mood[i]
    if (score[1] > 5){

        client.sendMessage( { to:numbers[i], from:'+16475594970', body:'Hello! This weeks mood score was a '+score[1].toString()+' you had a really good week!'}, function( err, data ) {
          
          console.log( data.body );
    
            });
    }

    else { 
        client.sendMessage( { to:numbers[i], from:'+16475594970', body:'Hello! This weeks mood score was a '+score[1].toString()+ ' you had a really tough week :( '}, function( err, data ) {
          
          console.log( data.body );
    
            });
    }
  }
  resetMood()
},  null, true);



 


app.post('/sms', function (req, res) {
  var resp = new twilio.TwimlResponse();
  if( req.body.Body.trim().toLowerCase() === 'subscribe' ) {W
    var fromNum = req.body.From;
    if(numbers.indexOf(fromNum) !== -1) {
          resp.message("you are already subscribed")
    } else {
      resp.message('Thank you, you are now subscribed. Reply "STOP" to stop receiving updates.');
      usersRef.push(fromNum);
    }
  } else {
    if( req.body.Body.trim().toLowerCase() === 'happy' ) {
      var fromNum = req.body.From
      if(numbers.indexOf(fromNum) !== -1) {
        resp.message("happy")
        for (i = 0; i < mood.length; i++) {
          if (mood[i][0] == fromNum) {
            mood[i][1] = mood[i][1] + 1
          }
        }
      }
    }

    if( req.body.Body.trim().toLowerCase() === 'sad' ) {
      var fromNum = req.body.From
      if(numbers.indexOf(fromNum) !== -1) {
        resp.message("sad")
        
        for (i = 0; i < mood.length; i++) {
          if (mood[i][0] == fromNum) {
            mood[i][1] = mood[i][1] - 1
          }
        }
      }
    }

    else if(req.body.Body.trim().toLowerCase() !== 'sad' || req.body.Body.trim().toLowerCase() !== "happy"  ) {
      resp.message('Welcome to Daily Updates. Text "Subscribe" receive updates.');
    }
  }
  res.writeHead(200, {
    'Content-Type':'text/xml'
  });
  res.end(resp.toString());
});
 
var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});