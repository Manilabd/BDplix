import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Devices', path: '/devices' },
        { name: 'Terms of Use', path: '/terms' }
      ]
    },
    {
      title: 'Discover',
      links: [
        { name: 'Movies', path: '/browse' },
        { name: 'TV Shows', path: '/tv-shows' },
        { name: 'New Releases', path: '/new' },
        { name: 'Coming Soon', path: '/coming-soon' }
      ]
    }
  ];
  
  const socialLinks = [
    { icon: <Facebook size={18} />, name: 'Facebook', url: '#' },
    { icon: <Twitter size={18} />, name: 'Twitter', url: '#' },
    { icon: <Instagram size={18} />, name: 'Instagram', url: '#' },
    { icon: <Youtube size={18} />, name: 'Youtube', url: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Film size={24} className="text-red-600" />
              <span className="text-xl font-bold text-white">Ur<span className="text-red-600">Movie</span>HD</span>
            </Link>
            <p className="text-sm mb-4">
              Ur Movie HD is your go-to platform for free streaming of high-quality movies and videos. 
              Enjoy unlimited access to a vast library of content across various genres.
            </p>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white text-sm font-medium mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-white text-sm rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-red-600"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white rounded-r-md px-4 py-2 flex items-center transition-colors">
                  <Mail size={16} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-medium mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="text-sm hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; {currentYear} Ur Movie HD. All rights reserved.</p>
          </div>
          
          {/* Social Media Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;