'use client';
import { useRouter } from 'next/navigation';
import { authClient } from './auth-client';
import { Button } from './ui';

export function SignOut() {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await authClient.signOut();
        router.push('/admin/login');
        router.refresh();
      }}
    >
      로그아웃
    </Button>
  );
}
