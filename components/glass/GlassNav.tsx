import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface NavLink {
  label: string;
  href: string;
}

interface GlassNavProps {
  links: NavLink[];
  logo?: React.ReactNode;
}

export const GlassNav: React.FC<GlassNavProps> = ({ links, logo }) => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl bg-white/25 border-b border-white/25 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {logo && <div className="text-2xl font-bold">{logo}</div>}
        <div className="flex gap-8">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'font-semibold transition-colors duration-200 relative',
                  isActive ? 'text-[#0369A1]' : 'text-[#0F172A] hover:text-[#0369A1]'
                )}
              >
                {link.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0369A1]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

GlassNav.displayName = 'GlassNav';
