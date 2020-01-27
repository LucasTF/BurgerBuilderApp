import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'https://burger-app-6f42b.firebaseio.com/'
});

export default axios;