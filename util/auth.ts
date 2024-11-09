import type { User } from '@clerk/nextjs/api'
import { prisma } from './db'
import { getAuth } from '@clerk/nextjs/server'

export const getUserFromClerkID = async (select = { id: true }) => {
  const { userId } = await getAuth();
  return prisma.user.findUnique({
    where: { id: userId },
    select,
  });
};


export const syncNewUser = async (clerkUser: User) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  })

  if (!existingUser) {
    const email = clerkUser.emailAddresses[0].emailAddress
    // const { subscriptionId, customerId } = await createAndSubNewCustomer(email)

    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email,
        account: {
          create: {
            // stripeCustomerId: customerId,
            // stripeSubscriptionId: subscriptionId,
          },
        },
      },
    })
  }
}