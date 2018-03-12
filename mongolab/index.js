const mongoose = require('mongoose');
const config = require('../config');
require('../models/User');

//setup mongolab
mongoose.connect(config.mongoURI);

const User = mongoose.model('users');



function checkDb(userData){

  // if(typeof callback === 'function'){
    let bool_tweetUser = true;
     User.findOne({
      screenName: userData.user.screen_name
    }, (err, user) => {
      console.log('inside index.js');
      if(err){
        console.log(err);
      }
      if(user === undefined){
        console.log('dont tweeet this user again')
        bool_tweetUser = false;
      }
      else{
        console.log('tweet this new user');
        bool_tweetUser = true;
      }
      // callback(bool_tweetUser);
    })
    return bool_tweetUser;
  //}
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
