const mongoose = require('mongoose');
const config = require('../config');
require('../models/User');

//setup mongolab
mongoose.connect(config.mongoURI);

const User = mongoose.model('users');



function checkDb(userData){
  //console.log(userData.id);
  let bool_tweetUser;
  User.find({
    screenName: userData.user.screen_name
  }, (err, user) => {
    if(err){
      console.log(err);
    }
    if(user.length){
      console.log('dont tweeet this user again')
      bool_tweetUser = false;
    }
    else{
      console.log('tweet this new user');
      bool_tweetUser = true;
    }
    return bool_tweetUser;
  })

}


function storeUser(userData){
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
    tweet: userData.text
  })

  user.save((err) => {
    if(err){
      console.log(err);
    }else{
      console.log('user saved in mongolab')
    }
  })

}


module.exports.checkDb = checkDb;
module.exports.storeUser = storeUser;
