import { api } from './api';

export async function forgot(cpf: string, email: string) {
    const response = await api.post('user/forgot-password', {
        cpf: cpf,
        email: email,
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(function (error) {
        return {
            status: error.response.status,
            data: error.response.data
        }
    });
    return response;
}
