import { Button } from '@/components/common/Button';

export default function TrainerPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Header */}
        <section className="mb-16">
          <h1 className="text-5xl font-display font-bold mb-4 text-gray-900">Trainer Dashboard</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Manage training sessions and customize content for your team.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">Trainer Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-display font-bold mb-3 text-gray-900">Learner Analytics</h3>
              <p className="text-gray-600 mb-6">
                Track individual and group progress, identify areas where learners struggle, and measure training effectiveness.
              </p>
              <Button variant="outline" size="sm">View Analytics</Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-display font-bold mb-3 text-gray-900">Custom Cohorts</h3>
              <p className="text-gray-600 mb-6">
                Create custom training cohorts for different roles, teams, and learning objectives within your organization.
              </p>
              <Button variant="outline" size="sm">Create Cohort</Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-display font-bold mb-3 text-gray-900">Content Management</h3>
              <p className="text-gray-600 mb-6">
                Customize chapters, add company-specific scenarios, and create role-based learning paths tailored to your needs.
              </p>
              <Button variant="outline" size="sm">Manage Content</Button>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-display font-bold mb-3 text-gray-900">Certification</h3>
              <p className="text-gray-600 mb-6">
                Set certification requirements, track completion, and issue certificates to graduates of your training programs.
              </p>
              <Button variant="outline" size="sm">View Certifications</Button>
            </div>
          </div>
        </section>

        {/* Coming Soon */}
        <section className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-display font-bold mb-2 text-gray-900">Trainer Features Coming Soon</h3>
          <p className="text-gray-600">
            We're building advanced trainer tools. Expect these features in the coming months.
          </p>
        </section>
      </div>
    </>
  );
}
