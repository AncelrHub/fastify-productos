require('dotenv').config();
const Fastify = require('fastify');
const cors = require('@fastify/cors'); // 👈 cambiamos el paquete

const PORT = process.env.PORT || 3000;

const fastify = Fastify({ logger: true });

// Registramos CORS
fastify.register(cors, {
  origin: true, // Permite cualquier origen
});

// Rutas
fastify.register(require('./routes'));

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    fastify.log.info(`Servidor escuchando en ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

