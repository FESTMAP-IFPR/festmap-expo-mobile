import { api } from './api';

export async function login(email: string, senha: string) {
    const response = await api.post('user/login', {
        email: email,
        senha: senha,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response;
}
