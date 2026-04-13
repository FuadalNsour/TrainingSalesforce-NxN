'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@/lib/constants';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href={ROUTES.home} className="flex items-center gap-3">
          <Image src="/logos/7x-black.svg" alt="7X" width={40} height={40} />
          <span className="text-sm text-gray-600 hidden sm:inline">NxN Training</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href={ROUTES.lifecycle} className="text-gray-600 hover:text-green-600 transition-colors">
            Lifecycle
          </Link>
          <Link href={ROUTES.labs} className="text-gray-600 hover:text-green-600 transition-colors">
            Labs
          </Link>
          <Link href={ROUTES.trainer} className="text-gray-600 hover:text-green-600 transition-colors text-sm">
            Trainer
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
