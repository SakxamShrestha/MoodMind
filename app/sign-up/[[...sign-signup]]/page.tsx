'use client'
import { SignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /new-user after a successful sign-up
    // You can add other logic here if needed
    router.push('/new-user');
  }, [router]);

  return (
    <SignUp
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
    />
  );
}
