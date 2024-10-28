import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();
  const href = userId ? '/journal' : '/new-user'; // Correct the variable usage

  return (
    <div className="w-screen h-screen bg-gray-700 flex justify-center text-white items-center">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-5xl text-green-50 mb-4">
          The best journaling app out there, period.
        </h1>
        <p className="text-2xl text-white/60 mb-4">
          Perfect for tracking your mood, and everything else if you would allow 😉
        </p>
        <div>
          <Link href={href}> {/* Use href without quotes */}
            <button className="bg-black px-4 py-2 rounded-lg text-xl">Get started!</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
