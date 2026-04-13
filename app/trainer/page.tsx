import { Button } from '@/components/common/Button';

export default function TrainerPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Header */}
        <section className="mb-16">
          <h1 className="text-5xl font-display font-bold mb-4">Trainer Dashboard</h1>
          <p className="text-lg text-secondary max-w-2xl">
            Manage training sessions, track learner progress, and customize content for your team.
          </p>
        </section>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-surface border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Active Learners</p>
            <p className="text-4xl font-display font-bold text-accent">12</p>
          </div>
          <div className="bg-surface border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Completed Chapters</p>
            <p className="text-4xl font-display font-bold text-accent">18</p>
          </div>
          <div className="bg-surface border border-gray-700 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Labs Completed</p>
            <p className="text-4xl font-display font-bold text-accent">24</p>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-8">Trainer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface border border-gray-700 rounded-lg p-8">
              <h3 className="text-xl font-display font-bold mb-3">Learner Analytics</h3>
              <p className="text-secondary mb-6">
                Track individual and group progress, identify areas where learners struggle, and measure training effectiveness.
              </p>
              <Button variant="outline" size="sm">View Analytics</Button>
            </div>

            <div className="bg-surface border border-gray-700 rounded-lg p-8">
              <h3 className="text-xl font-display font-bold mb-3">Custom Cohorts</h3>
              <p className="text-secondary mb-6">
                Create custom training cohorts for different roles, teams, and learning objectives within your organization.
              </p>
              <Button variant="outline" size="sm">Create Cohort</Button>
            </div>

            <div className="bg-surface border border-gray-700 rounded-lg p-8">
              <h3 className="text-xl font-display font-bold mb-3">Content Management</h3>
              <p className="text-secondary mb-6">
                Customize chapters, add company-specific scenarios, and create role-based learning paths tailored to your needs.
              </p>
              <Button variant="outline" size="sm">Manage Content</Button>
            </div>

            <div className="bg-surface border border-gray-700 rounded-lg p-8">
              <h3 className="text-xl font-display font-bold mb-3">Certification</h3>
              <p className="text-secondary mb-6">
                Set certification requirements, track completion, and issue certificates to graduates of your training programs.
              </p>
              <Button variant="outline" size="sm">View Certifications</Button>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="bg-surface border border-gray-700 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-display font-bold mb-2">Trainer Features Coming Soon</h3>
          <p className="text-secondary">
            We're building advanced trainer analytics and content management tools. Expect these features in the coming months.
          </p>
        </section>
      </div>
    </>
  );
}
