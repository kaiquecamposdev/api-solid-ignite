import { makeValidateCheckInUseCase } from '@/usecases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import * as z from 'zod'

export async function validate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return response.status(204).send()
}
