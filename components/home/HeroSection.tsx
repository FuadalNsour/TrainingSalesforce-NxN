import { MotionAccent } from '@/components/common/MotionAccent';

export const HeroSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Motion accent background */}
      <div className="absolute top-20 right-20 opacity-30">
        <MotionAccent orientation="diagonal" />
      </div>

      <div className="max-w-4xl text-center relative z-10">
        <h1 className="text-6xl md:text-7xl font-display font-bold mb-6 leading-tight">
          Master the NxN Salesforce Process
        </h1>

        <p className="text-xl text-secondary mb-12">
          Interactive training for Account Managers, Sales, CRM, and commercial leaders. Learn the complete customer lifecycle discipline that powers controlled growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-accent text-black px-8 py-4 font-display font-bold rounded hover:opacity-90 transition">
            Start Training
          </button>
          <button className="border-2 border-accent text-accent px-8 py-4 font-display font-bold rounded hover:bg-accent hover:text-black transition">
            View Journey
          </button>
        </div>
      </div>

      {/* Bottom motion accent */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <MotionAccent orientation="horizontal" />
      </div>
    </section>
  );
};
