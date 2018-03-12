let Twit = require('twit');
let config = require('./config');

function tweetNow(Twitter, tweetTxt){
  console.log('testing');

  let tweet = {
    status: tweetTxt
  }

  Twitter.post('statuses/update', tweet, (err, data, response) => {
    if(err){
      console.log(err);
       console.log("Error in Replying");
     }
     else{
       console.log("Gratitude shown successfully");
     }
  });
}


module.exports.tweetNow = tweetNow;
