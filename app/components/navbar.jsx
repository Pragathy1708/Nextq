// components/AnimatedNavbar.js

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';


const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

export default function AnimatedNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <p className="text-xl font-bold text-gray-900 dark:text-white">Startup</p>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <p className="text-gray-700 dark:text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  {item.name}
                </p>
              </Link>
            ))}
            <Link href="/login">
              <p className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                Login
              </p>
            </Link>
            <Link href="/book">
              <p className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                Book a Call
              </p>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500 focus:outline-none"
            >
              {isMobileMenuOpen ? (
               <Bars3Icon className="h-6 w-6" />
              ) : (
                
<XMarkIcon className="h-6 w-6" />

              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 px-2 pt-2 pb-3 space-y-1"
          >
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </a>
              </Link>
            ))}
            <Link href="/login">
              <a
                onClick={() => setIsMobileMenuOpen(false)}
                className="block bg-blue-500 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600"
              >
                Login
              </a>
            </Link>
            <Link href="/book">
              <a
                onClick={() => setIsMobileMenuOpen(false)}
                className="block bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200"
              >
                Book a Call
              </a>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
