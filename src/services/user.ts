import { api } from './api';
import { UserData } from '../interfaces/interfaces';


export async function update(user: UserData) {
    const response = await api.post('user/update', {
        _id: user._id,
        nome: user.name,
        cpf: user.cpf,
        sexo: user.sexo,
        email: user.email,
        data_de_nascimento: user.data_de_nascimento.split('/').reverse().join('-'),
        administrador: user.isAdmin,
        photo_uri: user.photo_uri
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

export async function findAll() {
    const response = await api.get('user/find-all').catch(function (error) {
        return {
            status: error.response.status,
            data: error.response.data,
            todos: error.response
        }
    });
    return response;
}

export async function deleteByEmail(email: string) {
    const response = await api.post('user/delete-by-email', { email: email }, {
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
