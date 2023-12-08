import { fastifyJwt } from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { gymsRoutes } from './http/controllers/gyms/routes'
import { usersRoutes } from './http/controllers/users/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})
app.register(usersRoutes)
app.register(gymsRoutes)

app.setErrorHandler((error, _request, response) => {
  if (error instanceof ZodError) {
    response
      .status(400)
      .send({ message: 'Validation Error.', issues: error.format() })
  }

  if (env.NODE_ENV === 'production') {
    console.error(error)
  }

  return response.status(500).send({ message: 'Internal Server Error.' })
})
