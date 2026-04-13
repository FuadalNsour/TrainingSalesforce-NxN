'use client';

import { useState } from 'react';
import { Card } from '@/components/common/Card';
import { ProgressBar } from '@/components/common/ProgressBar';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { Role } from '@/lib/types';

export default function Dashboard() {
  const [selectedRole, setSelectedRole] = useState<Role | 'all'>('all');

  // Mock user progress
  const chaptersCompleted = 1;
  const totalChapters = 5;
  const labsCompleted = 2;

  const chapters = [
    {
      id: '01-find-qualify',
      title: 'Find and Qualify the Right Customer',
      completed: true,
      duration: 45,
    },
    {
      id: '02-build-structure',
      title: 'Build the Right Customer Structure',
      completed: false,
      duration: 50,
    },
    {
      id: '03-sell-controlled',
      title: 'Sell in a Controlled Way',
      completed: false,
      duration: 55,
    },
    {
      id: '04-leadership',
      title: 'Leadership Visibility',
      completed: false,
      duration: 20,
    },
    {
      id: '05-full-cycle',
      title: 'Full-Cycle Demo and Lab',
      completed: false,
      duration: 30,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-display font-bold mb-2">Your Learning Dashboard</h1>
        <p className="text-secondary">Track your progress through the NxN Salesforce training</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <p className="text-secondary text-sm mb-2">Chapters Completed</p>
          <p className="text-4xl font-display font-bold text-accent">{chaptersCompleted}/{totalChapters}</p>
          <div className="mt-4">
            <ProgressBar current={chaptersCompleted} total={totalChapters} showPercent={false} />
          </div>
        </Card>

        <Card>
          <p className="text-secondary text-sm mb-2">Labs Completed</p>
          <p className="text-4xl font-display font-bold text-accent">{labsCompleted}</p>
          <p className="text-sm text-secondary mt-2">Interactive scenarios reviewed</p>
        </Card>

        <Card>
          <p className="text-secondary text-sm mb-2">Time Invested</p>
          <p className="text-4xl font-display font-bold text-accent">2h 15m</p>
          <p className="text-sm text-secondary mt-2">Out of ~3 hours total</p>
        </Card>
      </div>

      {/* Role Filter */}
      <div className="mb-8">
        <p className="text-secondary mb-4 text-sm">Filter by Role</p>
        <div className="flex flex-wrap gap-2">
          {['all', 'sales', 'account-manager', 'crm'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role as Role | 'all')}
              className={`px-4 py-2 rounded font-bold transition-colors ${
                selectedRole === role
                  ? 'bg-accent text-black'
                  : 'bg-surface border border-gray-700 text-white hover:border-accent'
              }`}
            >
              {role === 'all' ? 'All Roles' : role}
            </button>
          ))}
        </div>
      </div>

      {/* Chapters List */}
      <div>
        <h2 className="text-2xl font-display font-bold mb-6">Chapters</h2>
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <Card key={chapter.id} hoverable>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge type="status">
                      {chapter.completed ? '✓ Completed' : 'In Progress'}
                    </Badge>
                    <span className="text-sm text-secondary">{chapter.duration} min</span>
                  </div>
                  <h3 className="text-lg font-display font-bold">{chapter.title}</h3>
                </div>
                <Link href={ROUTES.chapter(chapter.id)}>
                  <Button variant="outline" size="sm">
                    {chapter.completed ? 'Review' : 'Continue'}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Next */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <h2 className="text-2xl font-display font-bold mb-6">Recommended Next</h2>
        <Card className="bg-gradient-to-r from-surface to-surface border-accent">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-secondary text-sm mb-2">Chapter 2 awaits</p>
              <h3 className="text-2xl font-display font-bold">Build the Right Customer Structure</h3>
              <p className="text-secondary mt-2">Learn how to architect accounts, hierarchies, and data relationships</p>
            </div>
            <Link href={ROUTES.chapter('02-build-structure')}>
              <Button variant="primary" size="lg">
                Start Chapter 2
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
