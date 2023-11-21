import { api } from './api';
import { User } from '../models/User';

export async function register(user: User) {
    const response = await api.post('user/create', {
        nome: user.name,
        cpf: user.cpf,
        sexo: user.sexo,
        email: user.email,
        senha: user.password,
        data_de_nascimento: user.dataNascimento.split('/').reverse().join('-'),
        administrador: user.administrador,
        photo_uri: ''
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(function (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            todos: error.response
        }
    });
    return response;
}
