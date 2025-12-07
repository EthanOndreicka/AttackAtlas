'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Activity } from 'lucide-react';
import logo from '../assets/attack-atlas-logo-white.png';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl tracking-tight">
          <Image 
            src={logo} 
            alt="Attack Atlas Logo" 
            width={40} 
            height={40} 
            className="w-10 h-10 object-contain"
          />
          <span className="text-white">
            Attack Atlas
          </span>
        </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive('/') ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-4 h-4" />
                Simulations
              </Link>
            </div>
      </div>
    </nav>
  );
}

