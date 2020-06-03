import express, { request, response } from 'express';

const app = express();

app.use(express.json())

const users = [
    'Jebediah',
    'Valentina',
    'Bob',
    'Bill'
];

app.get('/users', (request, response) => {
    // console.log('Listagem de usuários');

    // Query Param: parâmetros da própria rota, geralmente opcionais para filtros e paginação
    const search = String(request.query.search);

    const filteredUsers = search ? users.filter(user => user.toLowerCase().includes(search)) : users;
    return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {

    // Request Param: parâmetros da própria rota, que identificam um recurso
    const id = Number(request.params.id);

    const user = users[id];

    return response.json(user);
});

app.post('/users', (request, response) => {

    // Request Body: parâmetros para criação/atualização de dados
    const data = request.body;

    const user = {
        name: data.name,
        email: data.email
    };

    return response.json(user);
});

app.listen(4440);
