
module.exports.pickGeneric = (hashtag, url, screen_name) => {

  const total_generic_tweets = 3

  const randomGeneric = Math.round(Math.random() * (total_generic_tweets-1) +1);

  if(randomGeneric == 1){
    let tweet = {
      status: '@' + screen_name + ' . We wrote a summary of ' + hashtag + ' in this article ' + url +
      '. Feel free to follow @infourminutesco to get a summary of a whitepaper every week.'
    }
    return tweet;
  }

  else if(randomGeneric == 2){

    let tweet = {
      status: '@' + screen_name + ' . We wrote a four minutes summary of '+ hashtag +
      ' whitepaper. Feel free to check this link out: ' + url
    }
    return tweet;
  }

  else{
    let tweet = {
      status: '@' + screen_name + ' Hello! ' + hashtag +
      ' impressed us immensely. Hence, we wrote a summary of the whitepaper here: ' + url +
      ' Please checkout out the article and follow us at @infourminutesco.'
    }
    return tweet;
  }



}
