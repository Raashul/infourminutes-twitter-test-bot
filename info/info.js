/**
 * Copyright: Rashul Rajbhandari 2018
 * Author: Rashul Rajbhandari (rashul1996@gmail.com)
 *
 * @fileOverview: Information
 * Edit May 2018
 */

module.exports = {
    MIN_FOLLOWERS: 500,
    MIN_FRIENDS: 500,
    MIN_STATUS: 1000,
    params: {
      q: '#bitcoin OR #ethereum OR #dash OR #ripple OR #steem OR #ssb',
      result_type: 'recent',
      lang: 'en',
      count: 45, //100 is the max,
    }
}
