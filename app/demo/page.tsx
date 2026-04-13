import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';

export default function DemoPage() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pb-16">
        {/* Hero */}
        <section className="mb-16">
          <h1 className="text-5xl font-display font-bold mb-4">Interactive Demo Mode</h1>
          <p className="text-lg text-secondary max-w-2xl mb-8">
            Experience a guided walkthrough of the NxN Salesforce commercial process with real-world examples and interactive elements.
          </p>
          <Button variant="primary" size="lg">Start Demo</Button>
        </section>

        {/* Demo Scenarios */}
        <section className="mb-16">
          <h2 className="text-3xl font-display font-bold mb-8">Demo Scenarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Enterprise Deal Walkthrough',
                description: 'Follow a complete $500K+ enterprise deal from initial contact through contract signature',
                duration: '12 min',
                complexity: 'Advanced'
              },
              {
                title: 'Mid-Market Expansion',
                description: 'See how to expand an existing customer account and identify upsell opportunities',
                duration: '8 min',
                complexity: 'Intermediate'
              },
              {
                title: 'Quick Qualification',
                description: 'Learn to quickly qualify (or disqualify) prospects using the BANT framework',
                duration: '5 min',
                complexity: 'Beginner'
              },
              {
                title: 'Complex Stakeholder Navigation',
                description: 'Navigate a deal with multiple decision makers and competing interests',
                duration: '15 min',
                complexity: 'Advanced'
              },
              {
                title: 'Leadership Review Meeting',
                description: 'Prepare pipeline for executive review with data and insights',
                duration: '7 min',
                complexity: 'Intermediate'
              },
              {
                title: 'Customer Structure Mapping',
                description: 'Build account structure and map organizational dependencies',
                duration: '6 min',
                complexity: 'Beginner'
              },
            ].map((scenario, idx) => (
              <div key={idx} className="bg-surface border border-gray-700 rounded-lg p-6 hover:border-accent transition-colors">
                <h3 className="text-lg font-display font-bold mb-3">{scenario.title}</h3>
                <p className="text-secondary text-sm mb-4">{scenario.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge type="status">{scenario.duration}</Badge>
                  <Badge type="status">{scenario.complexity}</Badge>
                </div>
                <button className="text-accent hover:text-white transition-colors font-semibold text-sm">
                  Watch Demo →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16 pt-16 border-t border-gray-700">
          <h2 className="text-3xl font-display font-bold mb-8">Demo Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-display font-bold text-accent mb-3">Interactive Elements</h3>
              <ul className="space-y-2 text-secondary">
                <li>✓ Clickable decision points in conversations</li>
                <li>✓ Real-time scenario outcomes based on your choices</li>
                <li>✓ Detailed explanations of why certain approaches work</li>
                <li>✓ Common mistakes highlighted with explanations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-accent mb-3">Learning Tools</h3>
              <ul className="space-y-2 text-secondary">
                <li>✓ Replay scenarios with different choices</li>
                <li>✓ Comparison of successful vs unsuccessful approaches</li>
                <li>✓ Access to underlying frameworks and methodologies</li>
                <li>✓ Downloadable scenario guides and templates</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-accent/10 to-transparent border border-accent/30 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to Learn?</h2>
          <p className="text-secondary mb-8 max-w-xl mx-auto">
            Get interactive, scenario-based training that helps you understand not just what to do, but why it matters.
          </p>
          <Button variant="primary" size="lg">Explore All Demos</Button>
        </section>
      </div>
    </>
  );
}
