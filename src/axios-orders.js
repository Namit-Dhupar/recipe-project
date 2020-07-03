import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://reavt-burger-app.firebaseio.com/'
});

export default instance;