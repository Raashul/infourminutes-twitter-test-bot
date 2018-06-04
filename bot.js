
/**
 * Copyright: Rashul Rajbhandari 2018
 * Author: Rashul Rajbhandari (rashul1996@gmail.com)
 *
 * @fileOverview: Run Bot
 * 
 * Search tweets every 3 hrs
 * Check if tweets meet the validation criteria 
 * Automated Keywords update
 * OR
 * If user has been tweeted before
 * 
 */


const Twit = require('twit');
const config = require('./config'); 


const Follow = require('./follow');
const checkReply = require('./checkReply');
const mongolab = require('./mongolab/index');
const info = require('./info/info');
const tweetText = require('./info/index');

//set up twitter
const Twitter = new Twit(config);

const { getKeywords } = require('./firebase/index');

/*
  Make the twitter app search for tweets every ---- minutes
  Use setInterval method
*/
let retweet = (informationParams) => {
  console.log('the bot is starting');


  Twitter.get('search/tweets', informationParams, (err, data) => {
    if(err){
      console.log(err);
      return;
    }
    // if there no errors
    else if (!err) {
      console.log(informationParams);
      let snaps = data.statuses;

      let tweet_url = '';
      let tweet = '';
      let hashtagUsed = '';
   
      snaps.forEach(async post => {

        let screen_name = post.user.screen_name;

        //Does the user exist already in the db?
        const bool_user_not_in_db = (await mongolab.checkDb(post));

        //Does the user meet the retweet condition -- check checkReply.js
        const bool_tweet_condition = checkReply.checkToReply(post);

        if(bool_user_not_in_db === true && bool_tweet_condition === true){


          let hashTagsArr = post.entities.hashtags;
          let tweet = '';
          for(hashtag of hashTagsArr){
            const hashtagText = hashtag.text;

            //Can be done in a better way.
            //TODO: make separate file then extract key words from that file
            if(hashtagText.toLowerCase() == 'bitcoin'){
              console.log('bitcoin selected');
              hashtagUsed  = "Bitcoin";
              tweet_url = 'http://infourminutes.co/whitepaper/bitcoin';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);
              break;
            }

            else if (hashtagText.toLowerCase() == 'ethereum'){
                console.log('ethereum selected');
              hashtagUsed  = "Ethereum"
              tweet_url = 'http://infourminutes.co/whitepaper/ethereum';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);

              break;
            }

            else if (hashtagText.toLowerCase() == 'ripple'){
                console.log('rippleRR selected');
              hashtagUsed  = "Ripple"
              tweet_url = 'http://infourminutes.co/whitepaper/ripple';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);
              break;
            }

            else if (hashtagText.toLowerCase() == 'dash'){
                console.log('dash selected');
              hashtagUsed  = "Dash"
              tweet_url = 'http://infourminutes.co/whitepaper/dash';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);

              break;
            }

            else if (hashtagText.toLowerCase() == 'steem'){
              console.log('steem selected');
              hashtagUsed  = "steem"
              tweet_url = 'http://infourminutes.co/whitepaper/steem';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);
              break;
            }


            else if (hashtagText.toLowerCase() == 'ipfs'){
              console.log('ipfs selected');
              hashtagUsed  = "Ipfs"
              tweet_url = 'http://infourminutes.co/whitepaper/ipfs';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);
              break;
            }
          }

          //Post Tweet method
          if(tweet){
            // console.log('here is tweet');
            // console.log('sending this tweet');
            // console.log(tweet);
            //Store the user into the database
            mongolab.storeUser(post, () => {
              postTweet(screen_name, hashtagUsed, tweet_url, tweet);
            });
          }
        }
        else{
          console.log('already tweeted this user or did not meet condition');
        }

      });

    }
      // if unable to Search a tweet
      else {
        console.log('Something went wrong while SEARCHING...');
      }
  });
  }

/*  ----------------- The Bot Runs here -----------*/
//Every 3 hours

setInterval(startBot, 1000*60*60*3);
/*  ----------------- The Bot Runs here -----------*/


/*
  Get the keywords from firebase every time the bot needs to run
  Once the keywords are retreived. Update the params object 
  Then call the retweet function that runs the bot.
*/

function startBot(){
  
  //Get keywords from firebase.
  getKeywords((keywords) => {
    keywordsParam = keywords;
    
    let request = {
      MIN_FOLLOWERS: info.MIN_FOLLOWERS,
      MIN_FRIENDS: info.MIN_FRIENDS,
      MIN_STATUS: info.MIN_STATUS,
      params: {
        q: keywordsParam, //keywords from firebase
        result_type: info.params.result_type,
        lang: info.params.lang,
        count: info.params.count
      }
    }

    //If successful run the tweet function that runs the bot
    retweet(request.params);
  });
  
}





//callback function to post tweet
  function postTweet(screen_name, hashtagUsed, tweet_url,tweet){

    Twitter.post('statuses/update', tweet, (err, data, response) => {
      if(err){
        console.log(err);
      }
      if(response){
        console.log('auto reply succesful');
      }
    })

  }


  //If someone follows the account
  let stream = Twitter.stream('user');
  stream.on('follow', followed);
  //Function that gets called once the event is triggered
  function followed(event){
    /*
      Get the screen name of the user that followed
    */
    const name = event.source.name;
    const screenName = event.source.screen_name;
    const pageUrl = 'http://infourminutes.co/';

    Follow.tweetNow(Twitter,
      'Hey ' + '@' + screenName + '! ' + 'Thanks for following a twiter bot for @infourminutesco.' +
      ' Feel free to follow @infourminutesco, where we write a four minute summary of different cryptocurrency protocol and check out our articles at http://infourminutes.co');
  }
