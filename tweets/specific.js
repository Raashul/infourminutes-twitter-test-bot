
module.exports.pickSpecific = (hashtag, url, screen_name) => {

  const total_specific_tweets = 3

  const randomSpecific = Math.round(Math.random() * (total_specific_tweets-1) +1);

  if(randomSpecific == 1){

    let tweet = {
      status: '@' + screen_name + ' We love what ' + hashtag +' are doing.' +
      ' We have written a four minute summary of ' + hashtag + ' protocol in this article.' + url+
      ' .Would love to get your feedback on the content.'
    }
    return tweet;

  }

  else if(randomSpecific == 2){
    let tweet = {
      status: '@' + screen_name + ' We noticed that you are interested in ' + hashtag +
      '. Thought you may find this @infourminutesco summary of the whitepaper interesting. ' +
        url + '. We are always open to feedback. Would certainly appreciate one coming from you.'
    }
    return tweet;

  }

  else{
    let tweet = {
      status: '@' + screen_name + ' Noticed that you have been curious/researching about ' + hashtag +
      '. Here is our humble attempt at a 4 minute summary of the whitepaper. ' + url +
      ' It would be awesome to get your advice how @infourminutesco could make the content even better. '

        }
    return tweet;
  }

}
