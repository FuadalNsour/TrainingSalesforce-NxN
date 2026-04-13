'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href={ROUTES.home} className="flex items-center gap-3">
          <div className="text-2xl font-display font-bold text-green-600">NxN</div>
          <span className="text-sm text-gray-600 hidden sm:inline">Salesforce Training</span>
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
