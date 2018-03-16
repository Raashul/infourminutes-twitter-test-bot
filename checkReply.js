/*
  Way to calculate probablity
  1. Check follower count followers_count
  2. Check following count friends_count
  3. Check verified
  4. Status count > 500
  5. Number of tweets > 1500

  . Extract id to store it in firebase
*/
let info = require('./info');

function checkToReply(user){

  let bool_arr = [];

  let bool_followers = (user.user.followers_count > info.MIN_FOLLOWERS) ? true: false;
  let bool_friends = (user.user.friends_count > info.MIN_FRIENDS) ? true: false;
  let bool_verified = (user.user.verifed == true) ? true: false;
  let bool_statusCount = (user.user.statuses_count > info.MIN_STATUS) ? true: false;

  /*
  If the account is verifed. No need to check other conditions
  Else check conditions
  */
  if(bool_verified == true){
    return true;
  }
  else{
    let boolCount = 0;
    bool_arr.push(bool_followers, bool_friends, bool_verified, bool_statusCount);

    for(i=0; i < bool_arr.length; i++){
      if(bool_arr[i] == true){
        boolCount++;
      }
    }

    return (boolCount >= 2) ? true: false;
  }

}



module.exports.checkToReply = checkToReply;
