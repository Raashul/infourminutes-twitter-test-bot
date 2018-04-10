
module.exports.pickSpecific = (hashtag, url, screen_name) => {

  const total_specific_tweets = 3

  const randomSpecific = Math.round(Math.random() * (total_specific_tweets-1) +1);

  if(randomSpecific == 1){

    let tweet = {
      status: 'Hey ' + '@' + screen_name + '! We love what ' + hashtag +
      ' are doing. We are a big fan of decentralized exchanges as well.' +
      ' We have written a four minute summary of ' + hashtag + ' protocol in this article.' +
      ' Feel free to follow @infourminutesco.'
    }
    return tweet;

  }

  else if(randomSpecific == 2){
    let tweet = {
      status: '@' + screen_name + ' We noticed that you are interested in ' + hashtag +
      ': We wrote a four minute summary: ' + url +
       '. Please follow @infourminutesco, where we write a four minute summary of a whitepaper every week.'
    }
    return tweet;

  }

  else{
    let tweet = {
      status: '@' + screen_name + ' I saw that you were interested in ' + hashtag +
      '. We wrote a four minutes summary of ' + hashtag + ' whitepaper. Feel free to check this link out: ' + url +
      ' and follow us at @infourminutesco'
    }
    return tweet;
  }

}
