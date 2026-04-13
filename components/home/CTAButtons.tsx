export const CTAButtons: React.FC = () => {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/chapters/01-find-qualify">
          <button className="bg-accent text-black px-8 py-4 font-display font-bold rounded hover:opacity-90 transition">
            Start Chapter 1
          </button>
        </a>
        <a href="/labs">
          <button className="bg-gray-700 text-white px-8 py-4 font-display font-bold rounded hover:bg-gray-800 transition">
            Explore Labs
          </button>
        </a>
        <a href="/lifecycle">
          <button className="border-2 border-gray-300 text-gray-900 px-8 py-4 font-display font-bold rounded hover:bg-gray-100 transition">
            View Lifecycle
          </button>
        </a>
      </div>
    </section>
  );
};
