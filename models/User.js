const mongoose  = require('mongoose');
//const Schema    = mongoose.Schema;
const {Schema} = mongoose;

 const userSchema = new Schema({
   twitterId: String,
   screenName: String,
   name: String,
   tweet: String,
   followers: String,
   following: String,
   statuses: String
 });


mongoose.model('users', userSchema);
