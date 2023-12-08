import { UserAlreadyExistsError } from '@/usecases/errors/user-already-exists-error'
import { makeCreateGymUseCase } from '@/usecases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function create(request: FastifyRequest, response: FastifyReply) {
  const createBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { title, description, phone, latitude, longitude } =
    createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateGymUseCase()

    await createUseCase.execute({
      title,
      description,
      phone,
      latitude,
      longitude,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: error.message })
    }

    throw error
  }

  return response.status(201).send()
}
