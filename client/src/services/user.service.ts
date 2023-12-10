import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `https://stepform-vlot.onrender.com/api/test/`;

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getFormData() {
        return axios.get(API_URL + 'form', { headers: authHeader() });
    }

}

export default new UserService();