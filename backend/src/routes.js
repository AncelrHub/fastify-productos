const fp = require('fastify-plugin');

async function routes(fastify, options) {
  const knex = require('./db');

  const productSchema = {
    body: {
      type: 'object',
      required: ['nombre', 'precio'],
      properties: {
        nombre: { type: 'string' },
        precio: { type: 'number' }
      }
    }
  };

  fastify.post('/productos', { schema: productSchema }, async (request, reply) => {
    try {
      const { nombre, precio } = request.body;
      const [id] = await knex('productos').insert({ nombre, precio }).returning('id');
      const insertedId = typeof id === 'object' && id.id ? id.id : id;
      const newProduct = await knex('productos').where({ id: insertedId }).first();
      return reply.code(201).send(newProduct);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Error al crear producto' });
    }
  });

  fastify.get('/productos', async (request, reply) => {
    try {
      const prods = await knex('productos').select('*').orderBy('id', 'desc');
      return prods;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Error al listar productos' });
    }
  });

  fastify.delete('/productos/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const deleted = await knex('productos').where({ id }).del();
      if (!deleted) return reply.code(404).send({ error: 'Producto no encontrado' });
      return { success: true };
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Error al eliminar producto' });
    }
  });
}

module.exports = fp(routes);
