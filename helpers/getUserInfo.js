const token = 'EAAKnjkbSQvQBAIMVWDjrTicZCbh8ZAHW8ZCz1DIszsNoZBPZBSbuDWsEYEg5CqCBTSlAPJuAxCotd3ZACe8kBdswpwHtt7OdlUcEIbNBhGTfWjMGDNV7BQYk3LB7KHTzPvJp6zG6pYSFfkdcHZCCF8zyB9ZCXTeDcfENYg3Shs3g2AZDZD';
var FB = require('fb');
var configValues = require('../config.js');

module.exports = {
    getUser: (userId, fn) => {
        console.log(userId);
        console.log('getUser');
        FB.setAccessToken(token);
        FB.api(userId, function (res) {
            //FB.api('1176405892458966', function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            //console.log(res);
            //console.log(res.id);
            fn(res);
        });
    }
};