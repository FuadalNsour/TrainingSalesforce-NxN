'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href={ROUTES.home} className="flex items-center gap-2.5 group">
          <Image src="/logos/7x_Logo_Black_RGB.svg" alt="7X" width={56} height={56} className="transition-opacity group-hover:opacity-75" />
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">NxN Training</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href={ROUTES.lifecycle} className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors">
            Lifecycle
          </Link>
          <Link href={ROUTES.labs} className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors">
            Labs
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
