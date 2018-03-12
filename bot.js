console.log('the bot is starting');


let Twit = require('twit');
let config = require('./config');

let Follow = require('./follow');
let checkReply = require('./checkReply');
let mongolab = require('./mongolab/index');

//set up twitter
let Twitter = new Twit(config);


/*
  Make the twitter app search for tweets every ---- minutes
  Use setInterval method
*/


let retweet = () => {
  let params = {
      q: '#BitcoinRashulBot OR #EthereumRashulBot OR #CryptoRashul',
      result_type: 'recent',
      lang: 'en'
  }

  Twitter.get('search/tweets', params, function(err, data) {

    console.log('starting search');
    //
    let fs = require('fs');
    let json = JSON.stringify(data, null, 2);
    fs.writeFile("tweet.json", json);

    if(err){
      console.log(err);
      return;
    }
    // if there no errors
    else if (!err) {
      let snaps = data.statuses;
      let tweet_url = '';
      let tweet = '';
      let hashtagUsed = '';
      snaps.forEach(post => {
        //Does the user meet the retweet condition
        const retweet_bool = checkReply.checkToReply(post);

        //Does the user exist already in the db?
        const bool_tweetUser = (mongolab.checkDb(post) == true) ? true: false;
        console.log(bool_tweetUser);

        //If true: means tweet this user
        if(bool_tweetUser === true){
          console.log('storing' +  ' User ' + post.user.screen_name);

          // //Store the user into the database
           mongolab.storeUser(post);
          
          let hashTagsArr = post.entities.hashtags;
          // console.log(hashTagsArr);
          hashTagsArr.forEach(hashtag =>{

            //Can be done in a better way.
            //: make separate file then extract key words from that file
            if(hashtag.text == 'BitcoinRashulBot'){
              hashtagUsed  = "Bitcoin"
              tweet_url = 'http://infourminutes.co/whitepaper/bitcoin'

            }
            else if (hashtag.text == 'EthereumRashulBot'){
              hashtagUsed  = "Ethereum"
              tweet_url = 'http://infourminutes.co/whitepaper/ethereum'
            }

            else if(hashtag.text == 'CryptoRashul'){
              hashtagUsed  = "Crypto"
              tweet_url = 'http://infourminutes.co/whitepaper'

            }
            let screen_name = post.user.screen_name;
            let hashtagText = hashtag.text;
            postTweet(screen_name, hashtagUsed, tweet_url);
          }) //end of foreach
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
// setInterval(retweet, 1000*60*60);

retweet();


//callback function to post tweet
  function postTweet(screen_name, hashtagUsed, tweet_url){
    let tweet = {
      status: 'Hey ' + '@' + screen_name + ' ' + 'saw your tweet about ' + hashtagUsed + ' ' +
      'Check out ' + tweet_url + ' to read summaries of a whitepaper in four minutes'
    }

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
    console.log('follow event is running');

    /*
      Get the screen name of the user that followed
    */
    let name = event.source.name;
    let screenName = event.source.screen_name;
    let pageUrl = 'http://infourminutes.co/';
    Follow.tweetNow(Twitter,
      'Hey ' + '@' + screenName + ' ' + 'Thanks for following a test twiter bot for http://infourminutes.co/' +
    ' Check out ' + pageUrl + ' to read summaries of a whitepaper in four minutes');
  }
