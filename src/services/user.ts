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
    console.log(user)
    return response;
}
