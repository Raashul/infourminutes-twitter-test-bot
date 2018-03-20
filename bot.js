console.log('the bot is starting');


let Twit = require('twit');
let config = require('./config');

let Follow = require('./follow');
let checkReply = require('./checkReply');
let mongolab = require('./mongolab/index');

let info = require('./info');

//set up twitter
let Twitter = new Twit(config);

/*
  Make the twitter app search for tweets every ---- minutes
  Use setInterval method
*/

let retweet = () => {

  let params = info.params;
  Twitter.get('search/tweets', params, function(err, data) {

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
        let bool_tweetUser = (await mongolab.checkDb(post));
        //console.log('bool_tweetUser', bool_tweetUser);

        //Does the user meet the retweet condition -- check checkReply.js
        const retweet_bool = checkReply.checkToReply(post);
        //console.log('retweet_bool', retweet_bool);

        // console.log(bool_tweetUser);

        //find the max id
        //max = findMaxIdOfTweets(post, max_id);

        //find the min id for tweets
        //params.min_id = findMinIdOfTweets(post, params.max_id);

        //If true: means tweet this user

        if(bool_tweetUser === true && retweet_bool === true){

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
              tweet = {
                status: 'Hey ' + '@' + screen_name + '! ' + 'saw your tweet about ' + hashtagUsed + '. ' +
                'Check out ' + tweet_url + ' to understand the core fundamentals of ' + hashtagUsed
              }

              break;
            }

            else if (hashtag.text == 'ethereum' || hashtag.text == 'EthereumRR'){
              console.log('asda');
              hashtagUsed  = "Ethereum"
              tweet_url = 'http://infourminutes.co/whitepaper/ethereum';
               tweet = {
                status: 'Hey ' + '@' + screen_name + '! ' + 'saw your tweet about ' + hashtagUsed + '. ' +
                'Check out ' + tweet_url + ' to understand the core fundamentals of ' + hashtagUsed
              }
              break;
            }

            else if (hashtag.text == 'ripple' || hashtag.text == 'Ripple'){
              hashtagUsed  = "ripple"
              tweet_url = 'http://infourminutes.co/whitepaper/ripple';
               tweet = {
                status: 'Hey ' + '@' + screen_name + '! ' + 'saw your tweet about ' + hashtagUsed + '. ' +
                'Check out ' + tweet_url + ' to understand the core fundamentals of ' + hashtagUsed
              }
              break;
            }

            else if (hashtag.text == 'dash' || hashtag.text == 'Dash'){
              hashtagUsed  = "dash"
              tweet_url = 'http://infourminutes.co/whitepaper/dash';
               tweet = {
                status: 'Hey ' + '@' + screen_name + '! ' + 'saw your tweet about ' + hashtagUsed + '. ' +
                'Check out ' + tweet_url + ' to understand the core fundamentals of ' + hashtagUsed
              }
              break;
            }

            else{
              tweet_url = 'http://infourminutes.co/whitepaper'
              tweet = {
                status: 'Hey ' + '@' + screen_name + ' ! Saw that you were interested about cryptocurrencies' +
                ' Check out ' + tweet_url + ' to understand the core fundamentals of different cryptocurrencies'
              }
            }
          }

          //Post Tweet method
          //postTweet(screen_name, hashtagUsed, tweet_url, tweet);
        }
        else{
          console.log('already tweeted this user');
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
setInterval(retweet, 1000*60*60);

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


  function findMinIdOfTweets(tweet, currentMin){
    console.log('currentMin', currentMin);
    let min =  Math.min(currentMin, tweet.id);
    console.log('new min', min);
    return min;
  }


  //If someone follows the account
  let stream = Twitter.stream('user');
  stream.on('follow', followed);


  //Function that gets called once the event is triggered
  function followed(event){
    console.log('follow event is running');

    /*
      Get the screen name of the user that followed
    */
    let name = event.source.name;
    let screenName = event.source.screen_name;
    let pageUrl = 'http://infourminutes.co/';

    Follow.tweetNow(Twitter,
      'Hey ' + '@' + screenName + '. ' + 'Thanks for following a twiter bot for http://infourminutes.co/' +
    ' Check out ' + pageUrl + ' to understand the core fundamentals of different cryptocurrencies.');
  }
