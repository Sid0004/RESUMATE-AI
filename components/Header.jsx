'use client';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[background-filter]:bg-background/60">
      <nav className="mx-auto px-4 h-16 flex items-center justify-between w-full max-w-screen-xl">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={250}
            height={100}
            className="h-16 py-1 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2">
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <LayoutDashboard className="h-4 w-4 mr-1" />
                <span className="hidden md:block">Insights</span>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <StarsIcon className="h-4 w-4 mr-1" />
                  <span className="hidden md:block">Tools</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Build Resume</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/ai-cover-letter" className="flex items-center gap-2">
                    <PenBox className="h-4 w-4" />
                    <span>Cover Letter</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Interview Prep</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" size="sm">
                Sign in
              </Button>
            </SignInButton>
            <Link href="/sign-up">
              <Button variant="outline" size="sm">
                Sign up
              </Button>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
