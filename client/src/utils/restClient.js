import axios from 'axios'

export default (logMessage) => {
  console.log(logMessage);
  axios.get('/users/ping', {
                  // params :{
                  //     dataType: 'json'
                  // }
              })
                  .then(function (response) {
                      console.log('SUCCESS', response)
                      alert('Hi lisa')
                  })
                  .catch(function (error) {
                      console.log('ERROR', error)
                  });
}
