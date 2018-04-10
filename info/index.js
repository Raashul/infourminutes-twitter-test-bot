const specificTweets = require('../tweets/specific');
const genericTweet = require('../tweets/generic');

module.exports.sendTweet = (hashtag, url, screen_name) => {
  //randomly select either specific tweet or general tweet
  /*
    If Math.random is 0
      -select generic tweet
    Else
      - select specific tweet
  */
  if(Math.round(Math.random()) == 0){
    // console.log('randomly picked generic tweet')
    // console.log(genericTweet.pickGeneric(hashtag, url, screen_name));
    return genericTweet.pickGeneric(hashtag, url, screen_name);

  }
  else{
    // console.log('randomly picked specific tweet')
    // console.log(specificTweets.pickSpecific(hashtag, url, screen_name));
    return specificTweets.pickSpecific(hashtag, url, screen_name);
  }

}
