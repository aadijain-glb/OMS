import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#e6e6e6] pt-20 pb-8 border-t border-border mt-auto">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 lg:gap-10 mb-16">
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">UNLUME</h3>
            <p className="text-sm leading-relaxed text-text-secondary">
              Elevating your everyday style with <br />
              curated minimalist essentials.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold mb-2">Shop</h4>
            <Link to="/collections" className="text-sm text-text-secondary hover:text-text-primary">New Arrivals</Link>
            <Link to="/collections" className="text-sm text-text-secondary hover:text-text-primary">Best Sellers</Link>
            <Link to="/categories" className="text-sm text-text-secondary hover:text-text-primary">Accessories</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold mb-2">Company</h4>
            <Link to="/about" className="text-sm text-text-secondary hover:text-text-primary">About Us</Link>
            <Link to="/stories" className="text-sm text-text-secondary hover:text-text-primary">Sustainability</Link>
            <Link to="/contact" className="text-sm text-text-secondary hover:text-text-primary">Contact</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold mb-2">Legal</h4>
            <Link to="/privacy" className="text-sm text-text-secondary hover:text-text-primary">Privacy Policy</Link>
            <Link to="/terms-and-policies" className="text-sm text-text-secondary hover:text-text-primary">Terms of Service</Link>
          </div>
        </div>

        <div className="border-t border-[#e5e5e5] pt-8 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-xs text-text-secondary">© 2024 UNLUME. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
