'use client';

import { Button } from '@/components/ui/button';
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient
} from '@kinde-oss/kinde-auth-nextjs';
import Link from 'next/link';
import { Spinner } from './spinner';

export default function Navbar() {
  const { user, isAuthenticated, isLoading } = useKindeBrowserClient();

  return (
    <div className="flex  justify-between px-8 py-4">
      <ul className="flex gap-4">
        <li className="">
          <Link href="/">homepage</Link>
        </li>
        {isAuthenticated && (
          <>
            <li className="">
              <Link href="/posts">posts</Link>
            </li>
            <li className="">
              <Link href="/dashboard">dashboard</Link>
            </li>
          </>
        )}
      </ul>
      <div className="gap-4">
        {isLoading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <div className="flex gap-4 items-center">
            {user?.given_name}{' '}
            <Button asChild>
              <LogoutLink>logout</LogoutLink>
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button asChild>
              <LoginLink>login</LoginLink>
            </Button>
            <Button asChild variant="outline">
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
