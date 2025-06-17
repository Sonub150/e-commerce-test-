import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiMail, FiPhone, FiMapPin, FiArrowRight, FiHeart, FiShield, FiTruck, FiCreditCard } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "New Arrivals", href: "/new", icon: "✨" },
        { name: "Best Sellers", href: "/bestsellers", icon: "🔥" },
        { name: "Deals & Promotions", href: "/deals", icon: "🎉" },
        { name: "Gift Cards", href: "/giftcards", icon: "🎁" },
      ]
    },
    {
      title: "Customer Service",
      links: [
        { name: "Contact Us", href: "/contact", icon: "📞" },
        { name: "FAQs", href: "/faqs", icon: "❓" },
        { name: "Shipping Info", href: "/shipping", icon: "🚚" },
        { name: "Returns & Exchanges", href: "/returns", icon: "🔄" },
      ]
    },
    {
      title: "About Us",
      links: [
        { name: "Our Story", href: "/about", icon: "📖" },
        { name: "Careers", href: "/careers", icon: "💼" },
        { name: "Blog", href: "/blog", icon: "📝" },
        { name: "Sustainability", href: "/sustainability", icon: "🌱" },
      ]
    }
  ];

  const socialLinks = [
    { icon: <FiFacebook />, href: "#", name: "Facebook", color: "hover:text-blue-500" },
    { icon: <FiTwitter />, href: "#", name: "Twitter", color: "hover:text-sky-500" },
    { icon: <FiInstagram />, href: "#", name: "Instagram", color: "hover:text-pink-500" },
    { icon: <FiLinkedin />, href: "#", name: "LinkedIn", color: "hover:text-blue-600" },
    { icon: <FiYoutube />, href: "#", name: "YouTube", color: "hover:text-red-500" },
  ];

  const contactInfo = [
    { icon: <FiMail />, text: "support@luxecart.com", href: "mailto:support@luxecart.com" },
    { icon: <FiPhone />, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: <FiMapPin />, text: "123 Luxury Ave, Fashion District, NY 10001", href: "#" },
  ];

  const features = [
    { icon: <FiTruck />, title: "Free Shipping", description: "On orders over $50" },
    { icon: <FiShield />, title: "Secure Payment", description: "100% secure checkout" },
    { icon: <FiCreditCard />, title: "Easy Returns", description: "30 day return policy" },
    { icon: <FiHeart />, title: "24/7 Support", description: "Always here to help" },
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 relative overflow-hidden border-t border-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        {/* Features Section */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="text-3xl mb-4 text-amber-300">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Newsletter Subscription */}
          <div 
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <div 
                className="bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-xl px-3 py-1 mr-3 text-xl shadow-lg"
              >
                ✨
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                LuxeCart
              </h3>
            </div>
            <p className="mb-6 text-gray-600 leading-relaxed">
              Subscribe to our newsletter for exclusive offers, new arrivals, and insider access to the latest trends in luxury fashion.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-white border border-gray-300 rounded-xl px-4 py-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-lg shadow-lg transition-all"
                >
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div
              key={section.title}
            >
              <h4 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3"></span>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-800 transition-all flex items-center group"
                    >
                      <span className="mr-2 text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                      <span className="group-hover:underline underline-offset-4 decoration-2 decoration-blue-400">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-12"
        >
          <h4 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3"></span>
            Get in Touch
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item) => (
              <a
                key={item.text}
                href={item.href}
                className="flex items-start space-x-3 p-4 rounded-xl hover:bg-white/50 transition-all group"
              >
                <div className="text-blue-500 text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                    {item.text}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`text-gray-600 hover:text-gray-800 transition-colors ${social.color}`}
                aria-label={social.name}
              >
                <div className="text-2xl">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-600 text-sm">
              © {currentYear} LuxeCart. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 text-xs text-gray-500">
              <a href="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-gray-700 transition-colors">Terms of Service</a>
              <a href="/cookies" className="hover:text-gray-700 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;