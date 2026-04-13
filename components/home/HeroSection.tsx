import Image from 'next/image';
import { MotionAccent } from '@/components/common/MotionAccent';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Image src="/logos/nxn-green.svg" alt="NxN" width={80} height={80} className="mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-gray-900">
          Master NxN Sales Framework
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Learn the complete NxN methodology for consultative, controlled, and repeatable sales.
          Start with Chapter 1 and progress through five comprehensive modules.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/chapters/01-find-qualify">
            <button className="bg-accent text-black px-8 py-4 font-display font-bold rounded hover:opacity-90 transition">
              Start Learning
            </button>
          </a>
          <a href="/labs">
            <button className="border-2 border-accent text-accent px-8 py-4 font-display font-bold rounded hover:bg-accent hover:text-black transition">
              View Labs
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
