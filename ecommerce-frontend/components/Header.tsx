"use client";

import { useState } from "react";
import Link from "next/link";
import CartCount from "./CartCount";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main Header */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900"><Link href="/">MyWebsite</Link></div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-gray-700 hover:text-black">
              Home
            </a>

            <Link href="/products" className="text-gray-700 hover:text-black">
              Products
            </Link>

            <a href="#" className="text-gray-700 hover:text-black">
              Categories
            </a>

            <a href="#" className="text-gray-700 hover:text-black">
              About
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 md:flex">
            <button className="text-gray-700 hover:text-black">Search</button>
            <CartCount />
            {/* <button className="text-gray-700 hover:text-black">Cart (0)</button> */}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl text-gray-700 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-black"
              >
                Home
              </a>

              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-black"
              >
                Shop
              </a>

              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-black"
              >
                Categories
              </a>

              <a
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-black"
              >
                About
              </a>

              <div className="border-t pt-4">
                <button className="mr-6 text-gray-700 hover:text-black">
                  Search
                </button>

                <button className="text-gray-700 hover:text-black">
                  Cart (0)
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
