module.exports.sendTweet = (hashtag, url, screen_name) => {
  //randomly select either specific tweet or general tweet
  /*
    If Math.random is 0
      -select generic tweet
    Else
      - select specific tweet
  */
  if(Math.round(Math.random()) == 0){
    console.log('randomly picked generic tweet')
    let tweet = {
      status: 'Hey ' + '@' + screen_name + '! ' + 'Looks like you were looking to read more about ' + hashtag + '. ' +
      'We have written a four minute summary of ' + hashtag + ' Feel free to follow @infourminutesco'
    }
    return tweet;
  }
  else{
    console.log('randomly picked specific tweet')
    let tweet = {
      status: 'Hey ' + '@' + screen_name + '! We love what ' + hashtag +
      ' are doing. We are a big fan of decentralized exchanges as well.' +
      ' We have written a four minute summary of ' + hashtag + ' protocol in this article.' +
      ' Feel free to follow @infourminutesco.'

    }
    return tweet;
  }

}
