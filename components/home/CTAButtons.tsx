'use client';

import { Button } from '@/components/common/Button';
import { ROUTES } from '@/lib/constants';
import Link from 'next/link';

export const CTAButtons: React.FC = () => {
  return (
    <section className="bg-surface border-y border-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={ROUTES.home}>
          <Button variant="primary" size="lg">
            Go to Home
          </Button>
        </Link>
        <Link href={ROUTES.chapter('01-find-qualify')}>
          <Button variant="secondary" size="lg">
            Start Chapter 1
          </Button>
        </Link>
        <Link href={ROUTES.lifecycle}>
          <Button variant="outline" size="lg">
            View Lifecycle
          </Button>
        </Link>
      </div>
    </section>
  );
};
