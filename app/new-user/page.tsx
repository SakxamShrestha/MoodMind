import { prisma } from '@/utils/db';
import { getAuth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const createNewUser = async () => {
  const reqHeaders = headers(); // Do not await; headers() returns synchronously in this context.

  // Construct a request-like object with the headers
  const requestLike = {
    headers: {
      get: async (key: string) => (await reqHeaders).get(key), // Clerk requires a headers object with a `get` method
    },
  };

  const { userId } = await getAuth(requestLike as any); // Cast as `any` to bypass type issues

  // Check if userId is available (i.e., the user is authenticated)
  if (!userId) {
    console.error('No authenticated user found');
    return;
  }

  // Check for existing user in the database
  const match = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  // Create a new user if not found
  if (!match) {
    const userEmail = 'default@example.com'; // Replace with actual email fetching if needed
    await prisma.user.create({
      data: {
        clerkId: userId,
        email: userEmail,
      },
    });
  }

  // Redirect to /journal after creating the user or if already exists
  redirect('/journal');
};

const NewUser = async () => {
  await createNewUser();
  return <div>...loading</div>;
};

export default NewUser;
