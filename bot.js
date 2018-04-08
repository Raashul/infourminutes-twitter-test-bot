const Twit = require('twit');
const config = require('./config');

const Follow = require('./follow');
const checkReply = require('./checkReply');
const mongolab = require('./mongolab/index');
const info = require('./info/info');
const tweetText = require('./info/index');

//set up twitter
const Twitter = new Twit(config);

const params = info.params;

/*
  Make the twitter app search for tweets every ---- minutes
  Use setInterval method
*/
let retweet = () => {
  console.log('the bot is starting');

  Twitter.get('search/tweets', params, (err, data) => {
    console.log('starting search');

    if(err){
      console.log(err);
      return;
    }
    // if there no errors
    else if (!err) {
      let snaps = data.statuses;
      console.log(snaps.length);

      let tweet_url = '';
      let tweet = '';
      let hashtagUsed = '';

      snaps.forEach(async post => {

        let screen_name = post.user.screen_name;

        //Does the user exist already in the db?
        const bool_user_not_in_db = (await mongolab.checkDb(post));
        //console.log('bool_user_not_in_db', bool_user_not_in_db);

        //Does the user meet the retweet condition -- check checkReply.js
        const bool_tweet_condition = checkReply.checkToReply(post);
        //console.log('bool_tweet_condition', bool_tweet_condition);

        if(bool_user_not_in_db === true && bool_tweet_condition === true){

          // let fs = require('fs');
          // let json = JSON.stringify(data, null, 2);
          // fs.writeFile("tweet.json", json);

          //console.log('storing' +  ' User ' + post.user.screen_name);

          //Store the user into the database
          mongolab.storeUser(post);

          let hashTagsArr = post.entities.hashtags;
          let tweet = '';
          // console.log(hashTagsArr);
          for(hashtag of hashTagsArr){
            let hashtagText = hashtag.text;

            //Can be done in a better way.
            //TODO: make separate file then extract key words from that file
            if(hashtag.text == 'bitcoin' || hashtag.text == 'Bitcoin'){
              hashtagUsed  = "Bitcoin";
              tweet_url = 'http://infourminutes.co/whitepaper/bitcoin';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);
              break;
            }

            else if (hashtag.text == 'ethereumRR' || hashtag.text == 'EthereumRR'){
              hashtagUsed  = "Ethereum"
              tweet_url = 'http://infourminutes.co/whitepaper/ethereum';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);

              break;
            }

            else if (hashtag.text == 'ripple' || hashtag.text == 'Ripple'){
              hashtagUsed  = "ripple"
              tweet_url = 'http://infourminutes.co/whitepaper/ripple';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);
              break;
            }

            else if (hashtag.text == 'dash' || hashtag.text == 'Dash'){
              hashtagUsed  = "dash"
              tweet_url = 'http://infourminutes.co/whitepaper/dash';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);

              break;
            }

            else if (hashtag.text == 'ipfs' || hashtag.text == 'Ipfs'){
              hashtagUsed  = "ipfs"
              tweet_url = 'http://infourminutes.co/whitepaper/ipfs';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);

              break;
            }
            else{
              tweet_url = 'http://infourminutes.co/whitepaper'
              hashtagUsed  = "cryptocurrencies"
              tweet_url = 'http://infourminutes.co';
              tweet = tweetText.sendTweet(hashtagUsed, tweet_url, screen_name);
              break;
            }
          }

          //Post Tweet method
          postTweet(screen_name, hashtagUsed, tweet_url, tweet);
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

//Run the bot every one hour
setInterval(retweet, 1000*60*60*3);
//retweet();


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
      'Hey ' + '@' + screenName + '! ' + 'Thanks for following a twiter bot for @infourminutesco' +
      ' We write a four minute summary of different cryptocurrency protocol. Check out our articles at http://infourminutes.co');
  }
