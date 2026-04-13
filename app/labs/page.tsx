'use client';

import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { LABS } from '@/lib/labs-data';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function LabsPage() {
  const labs = Object.values(LABS);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Header */}
        <section className="mb-16 pt-12">
          <h1 className="text-5xl font-display font-bold text-gray-900 mb-4">Interactive Labs</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Practice real-world scenarios and test your understanding with hands-on labs that simulate
            actual commercial situations.
          </p>
        </section>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labs.map((lab) => (
            <Card key={lab.id} hoverable>
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-display font-bold text-gray-900">{lab.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{lab.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-sm font-bold text-green-600">
                    {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
                  </span>
                  <span className="text-sm text-gray-600">Chapter {parseInt(lab.chapterId.substring(0, 2), 10)}</span>
                </div>
                <Link href={ROUTES.lab(lab.id)}>
                  <Button variant="primary" size="sm">
                    Start Lab →
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <section className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">How Labs Work</h2>
          <p className="text-gray-600 max-w-2xl">
            Each lab presents a real-world scenario. Review the context, think through the situation,
            and provide your response. You'll receive feedback showing how experts would approach the
            same scenario and why.
          </p>
        </section>
      </div>
    </div>
  );
}
