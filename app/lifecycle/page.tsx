import { LifecycleViewer } from '@/components/lifecycle/LifecycleViewer';

export default function LifecyclePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-50 border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gray-900">
            NxN Lifecycle Explorer
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive visualization of the complete Lead → Account → Opportunity → Quote → Contract journey
          </p>
        </div>
      </section>

      <LifecycleViewer />
    </div>
  );
}
