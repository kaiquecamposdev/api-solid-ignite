import { UnauthorizedError } from '@/usecases/errors/unauthorized-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, response: FastifyReply) {
  try {
    await request.jwtVerify()

    console.log(request.user.sub)
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return response.status(401).send({ message: error.message })
    }

    throw error
  }

  return response.status(200).send()
}
