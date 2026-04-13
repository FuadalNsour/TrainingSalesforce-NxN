import { LifecycleViewer } from '@/components/lifecycle/LifecycleViewer';

export default function LifecyclePage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="bg-surface border-b border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            NxN Lifecycle Explorer
          </h1>
          <p className="text-secondary text-lg">
            Interactive visualization of the complete Lead → Account → Opportunity → Quote → Contract journey
          </p>
        </div>
      </section>

      <LifecycleViewer />
    </div>
  );
}
