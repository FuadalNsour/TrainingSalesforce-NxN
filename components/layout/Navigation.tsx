'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-surface border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link href={ROUTES.home} className="flex items-center gap-3">
          <div className="text-2xl font-display font-bold text-accent">7X</div>
          <span className="text-sm text-secondary hidden sm:inline">NxN Training</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href={ROUTES.dashboard} className="text-secondary hover:text-accent transition-colors">
            Dashboard
          </Link>
          <Link href={ROUTES.lifecycle} className="text-secondary hover:text-accent transition-colors">
            Lifecycle
          </Link>
          <Link href={ROUTES.labs} className="text-secondary hover:text-accent transition-colors">
            Labs
          </Link>
          <Link href={ROUTES.trainer} className="text-secondary hover:text-accent transition-colors text-sm">
            Trainer
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
