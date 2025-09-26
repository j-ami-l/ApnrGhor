import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import logo from '../../assets/logo_white.png'
const Footer = () => {
  return (
    <footer className="bg-emerald-700 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <img className="w-50" src={logo} alt="" />
          <p className="mt-2 text-sm text-emerald-100">
            A modern Building Management System to manage apartments, tenants,
            and payments with ease and reliability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-emerald-100">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/apartments" className="hover:text-white">Apartments</a></li>
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-emerald-100 text-sm">
            <li className="flex items-center gap-2"><MdLocationOn /> Chittagong, Bangladesh</li>
            <li className="flex items-center gap-2"><MdPhone /> +880 1234-567890</li>
            <li className="flex items-center gap-2"><MdEmail /> support@apnrghor.com</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="https://github.com/j-ami-l" className="p-2 bg-white text-emerald-700 rounded-full hover:bg-emerald-600 hover:text-white transition">
              <FaFacebookF />
            </a>
            <a href="https://github.com/j-ami-l" className="p-2 bg-white text-emerald-700 rounded-full hover:bg-emerald-600 hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="https://github.com/j-ami-l" className="p-2 bg-white text-emerald-700 rounded-full hover:bg-emerald-600 hover:text-white transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center border-t border-emerald-600 mt-8 pt-4 text-emerald-100 text-sm">
        © {new Date().getFullYear()} ApnrGhor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
