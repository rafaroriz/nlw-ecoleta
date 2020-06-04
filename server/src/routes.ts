import express, { request, response } from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:4440/uploads/${item.image}`
        };
    });

    return response.json(serializedItems)
});

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const trx = await knex.transaction();

    const insertedPoint = await trx('points').insert({
        image: 'fake-image',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });

    const point_id = insertedPoint[0];

    const point_items = items.map((item_id: number) => {
        return {
            item_id,
            point_id
        };
    });

    await trx('point_items').insert(point_items);

    return response.json({success: true});
})

export default routes;

