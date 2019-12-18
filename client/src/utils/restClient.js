import axios from 'axios'

export function pingServer(logMessage) {
    console.log(logMessage);
    axios.get('/ping')
    .then(function (response) {
        console.log('SUCCESS', response);
    })
    .catch(function (error) {
        console.log('ERROR', error);
    });
}

export function getDotStr() {
    axios.get('/dotstr')
    .then(function (response) {
        console.log('SUCCESS', response);
        return response.data.data;
    })
    .catch(function (error) {
        console.log('ERROR', error);
    });

}
