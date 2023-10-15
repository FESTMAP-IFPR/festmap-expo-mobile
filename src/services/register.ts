import {api} from './api';
import {User} from '../models/User';

export async function register(user: User) {
    console.log('Enviado para o endpoint');
    console.log('localhost:3000/register');
    const response = await api.post('/register', user);
    return response.data;
}
