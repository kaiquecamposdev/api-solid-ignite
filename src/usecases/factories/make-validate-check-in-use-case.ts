import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-checkins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeRegisterUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(checkInsRepository)

  return useCase
}
