import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  MapPin,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 text-indigo-400 mr-2" />
              <span className="text-2xl font-bold text-white">EduPro Tuition</span>
            </div>
            <p className="text-gray-400 mb-6">
              EduPro Tuition connects guardians, students, and tutors seamlessly. Trusted by thousands, we bridge the gap between quality education and exceptional tutors.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-indigo-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" className="hover:text-indigo-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" className="hover:text-indigo-400 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" className="hover:text-indigo-400 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link to="/jobs" className="hover:text-indigo-400 transition-colors">Find Tuition Jobs</Link>
              <Link to="/tutors" className="hover:text-indigo-400 transition-colors">Browse Tutors</Link>
              <Link to="/register" className="hover:text-indigo-400 transition-colors">Become a Tutor</Link>
              <Link to="/success-stories" className="hover:text-indigo-400 transition-colors">Success Stories</Link>
              <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
              <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-indigo-400 mr-3 mt-1" />
                <p>123 Education Street, Dhaka, Bangladesh</p>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-indigo-400 mr-3" />
                <a href="mailto:info@eduprotuition.com" className="hover:text-indigo-400 transition-colors">
                  info@eduprotuition.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-indigo-400 mr-3" />
                <a href="tel:+8801821702694" className="hover:text-indigo-400 transition-colors">
                  +880 1821702694
                </a>
              </div>
            </div>
          </div>

          {/* Trust Signals */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Why Choose Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-indigo-400 mr-3" />
                <span>Verified Tutors</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-indigo-400 mr-3" />
                <span>Quality Education</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-indigo-400 mr-3" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 py-8 border-t border-gray-700">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-6">Get updates about new tutors and tuition opportunities</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500 text-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} EduPro Tuition. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-indigo-400 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-indigo-400 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;