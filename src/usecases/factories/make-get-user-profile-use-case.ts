import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeRegisterUseCase() {
  const prismaGetUserProfileUseCaseRepository = new PrismaUsersRepository()
  const useCase = new GetUserProfileUseCase(
    prismaGetUserProfileUseCaseRepository,
  )

  return useCase
}
