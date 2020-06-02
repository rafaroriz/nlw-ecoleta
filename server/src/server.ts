import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    response.json([
        'Rafael',
        'Júlia',
        'Nicolas',
        'Paulo'
    ]);
});

app.listen(4440);
