
module.exports.pickGeneric = (hashtag, url, screen_name) => {

  const total_generic_tweets = 3

  const randomGeneric = Math.round(Math.random() * (total_generic_tweets-1) +1);

  if(randomGeneric == 1){
    let tweet = {
      status: '@' + screen_name + ' ' + hashtag + '  impressed us immensely. Here is our take on the ' + hashtag
     + '. Thought you may like it: ' + url + '. Would love to get your feedback on our content.'
    }
    return tweet;
  }

  else if(randomGeneric == 2){

    let tweet = {
      status: '@' + screen_name + ' we wrote a four minutes summary of '+ hashtag +
      ' whitepaper. Feel free to check this link out: ' + url + '. Would be amazing to get your feedback on our content.'
    }
    return tweet;
  }

  else{
    let tweet = {
      status: '@' + screen_name + ' Hello! ' + hashtag +
      ' impressed us immensely. Hence, we wrote a summary of the whitepaper here: ' + url +
      '. Would be amazing to get your feedback on the @infourminutesco whitepaper.'
    }
    return tweet;
  }



}
