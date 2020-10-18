var axios = require('axios');

const parse = (texts, callback) =>{
    var data = JSON.stringify(texts);
    var config = {
        method: 'post',
        url: 'http://hackathon-yuda.herokuapp.com/word-frequency',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        callback(JSON.stringify(response.data))
        return JSON.stringify(response.data)
      })
      .catch(function (error) {
        console.log('error', err)
      });
}

module.exports = {axios, parse}


