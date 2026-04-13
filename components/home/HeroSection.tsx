
import Image from 'next/image';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Image src="/logos/NXN_Lockup_NXN_Logo_Blue_RGB.svg" alt="NxN" width={120} height={80} className="mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gray-900">
          Master NxN Sales Framework
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Learn the complete NxN methodology for consultative, controlled, and repeatable sales.
          Start with Chapter 1 and progress through five comprehensive modules.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/chapters/01-why-matters" className="inline-block">
            <button className="bg-green-600 text-white px-10 py-4 font-display font-bold rounded-lg hover:bg-green-700 transition shadow-md">
              Start Learning
            </button>
          </a>
          <a href="/labs" className="inline-block">
            <button className="border-2 border-green-600 text-green-600 px-10 py-4 font-display font-bold rounded-lg hover:bg-green-50 transition">
              View Labs
            </button>
          </a>
          <a href="/lifecycle" className="inline-block">
            <button className="border-2 border-gray-400 text-gray-700 px-10 py-4 font-display font-bold rounded-lg hover:bg-gray-50 transition">
              Lifecycle
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
