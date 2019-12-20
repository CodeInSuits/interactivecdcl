import axios from 'axios'

// function that pings server for testing
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

// get a dot string from server for test rendering
export async function getDotStr() {
    try {
        const response = await axios.get('/dotstr');
        return response.data.data;
    }
    catch (err) {
        console.log('Error', err)
    }
}
