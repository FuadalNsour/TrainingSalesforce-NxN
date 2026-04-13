import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-8">
          {/* Logos */}
          <div className="flex items-center gap-6">
            <Image src="/logos/7x-black.svg" alt="7X" width={50} height={50} />
            <span className="text-gray-400">×</span>
            <Image src="/logos/nxn-green.svg" alt="NxN" width={50} height={50} />
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-600 text-sm">
            <p>&copy; 2026 NxN Salesforce Training Portal</p>
            <p className="text-xs text-gray-500">All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
