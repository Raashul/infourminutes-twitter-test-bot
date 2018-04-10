const mongoose = require('mongoose');
const config = require('../config');
require('../models/User');

//setup mongolab
mongoose.connect(config.mongoURI);

const User = mongoose.model('users');


function checkDb(userData){
  return new Promise( (resolve, reject) => {
     User.findOne({
      screenName: userData.user.screen_name
    }, (err, user) => {
      if(err) {
        reject(err);
      }
      if(user === null) {
        //console.log('tweet this new user');
        resolve(true);
      } else {
        //console.log('dont tweeet this user again')
        resolve(false);
      }

    })
  });
}

function storeUser(userData, callback){
  /*
  Id- userData.id
  screen_name- userData.user.screen_name
  name - userData.user.name
  tweetText - userData.text
  */
  let user = new User({
    twitterId: userData.id,
    screenName: userData.user.screen_name,
    name: userData.user.name,
    tweet: userData.text,
    followers: userData.user.followers_count,
    following: userData.user.friends_count,
    statuses: userData.user.statuses_count
  })

  user.save((err) => {
    if(err){
      console.log(err);
    }else{
      console.log('user saved in mongolab');
      callback();
    }
  })

}


module.exports.checkDb = checkDb;
module.exports.storeUser = storeUser;
