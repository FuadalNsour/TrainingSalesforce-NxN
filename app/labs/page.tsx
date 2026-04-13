import { Badge } from '@/components/common/Badge';

export default function LabsPage() {
  const labs = [
    {
      id: 'lab-01',
      title: 'The Ghost Company',
      difficulty: 'beginner',
      description: 'You\'re contacted by a potential customer, but their details seem incomplete. How do you qualify this opportunity?',
      chapterId: '01-find-qualify',
    },
    {
      id: 'lab-02',
      title: 'The Gatekeeper',
      difficulty: 'intermediate',
      description: 'Your contact has budget, but you need to get past their procurement process. Navigate stakeholder politics.',
      chapterId: '01-find-qualify',
    },
    {
      id: 'lab-03',
      title: 'Account Structure Assessment',
      difficulty: 'intermediate',
      description: 'You inherit a large account with unclear stakeholder mapping. Build a clear account structure.',
      chapterId: '02-build-structure',
    },
    {
      id: 'lab-04',
      title: 'Sales Qualification Scenario',
      difficulty: 'intermediate',
      description: 'Work through a complete qualification conversation using controlled selling principles.',
      chapterId: '03-sell-controlled',
    },
    {
      id: 'lab-05',
      title: 'Building a Leadership Dashboard',
      difficulty: 'advanced',
      description: 'Create metrics and dashboards that give leadership the visibility they need.',
      chapterId: '04-leadership',
    },
    {
      id: 'lab-06',
      title: 'Integrated Deal Scenario',
      difficulty: 'advanced',
      description: 'Execute a complete deal cycle from prospecting through close.',
      chapterId: '05-full-cycle',
    },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Header */}
        <section className="mb-16">
          <h1 className="text-5xl font-display font-bold mb-4">Interactive Labs</h1>
          <p className="text-lg text-secondary max-w-2xl">
            Practice real-world scenarios and test your understanding with hands-on labs that simulate actual commercial situations.
          </p>
        </section>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-surface border border-gray-700 rounded-lg p-6 hover:border-accent transition-colors">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-display font-bold">{lab.title}</h3>
                <Badge type="status">
                  {lab.difficulty.charAt(0).toUpperCase() + lab.difficulty.slice(1)}
                </Badge>
              </div>
              <p className="text-secondary mb-4">{lab.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">From Chapter {lab.chapterId.charAt(0)}</span>
                <button className="text-accent hover:text-white transition-colors font-semibold">
                  Start Lab →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <section className="mt-16 pt-16 border-t border-gray-700">
          <h2 className="text-3xl font-display font-bold mb-8">Additional Labs Coming Soon</h2>
          <p className="text-secondary max-w-2xl">
            We're building additional labs and scenarios based on your feedback. Check back regularly for new content.
          </p>
        </section>
      </div>
    </>
  );
}
