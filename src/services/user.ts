import { api } from './api';
import { User } from '../models/User';

export async function update(user: User) {
    const response = await api.put('user/update', {
        nome: user.name,
        cpf: user.cpf,
        sexo: user.sexo,
        email: user.email,
        senha: user.password,
        photo_uri: user.photo_uri,
        data_de_nascimento: user.dataNascimento.split('/').reverse().join('-'),
        administrador: user.administrador,
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
