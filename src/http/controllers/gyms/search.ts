import { makeSearchGymsUseCase } from '@/usecases/factories/make-search-gyms-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function search(request: FastifyRequest, response: FastifyReply) {
  const searchBodySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    q: z.string(),
  })

  const { page, q } = searchBodySchema.parse(request.body)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    query: q,
    page,
  })

  return response.status(201).send({ gyms })
}
