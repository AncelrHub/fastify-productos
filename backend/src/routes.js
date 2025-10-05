// backend/src/routes.js
const fp = require('fastify-plugin');

async function routes(fastify, options) {
  const knex = require('./db');

  const productSchema = {
    body: {
      type: 'object',
      required: ['nombre', 'precio'],
      properties: {
        nombre: { type: 'string' },
        precio: { type: 'number' },
        stock: { type: 'integer' }
      }
    }
  };

  // Listar todos los productos
  fastify.get('/productos', async (request, reply) => {
    try {
      const productos = await knex('productos').select('*').orderBy('id', 'asc');
      return productos;
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Error al obtener productos' });
    }
  });

  // Crear un producto
  fastify.post('/productos', { schema: productSchema }, async (request, reply) => {
    try {
      const { nombre, precio, stock = 0 } = request.body;
      // Insert and return inserted row (Postgres supports returning)
      const [inserted] = await knex('productos').insert({ nombre, precio, stock }).returning('*');
      // inserted puede ser un objeto con la fila completa
      return reply.code(201).send(inserted);
    } catch (err) {
      fastify.log.error(err);
      reply.code(500).send({ error: 'Error al crear producto' });
    }
  });

  // Eliminar producto por id
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
