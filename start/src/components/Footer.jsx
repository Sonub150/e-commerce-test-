import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiYoutube, FiMail, FiPhone, FiMapPin, FiArrowRight, FiHeart, FiShield, FiTruck, FiCreditCard } from 'react-icons/fi';
import { motion } from 'framer-motion';

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="text-3xl mb-4 text-amber-300">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Newsletter Subscription */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center mb-6">
              <motion.div 
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-gradient-to-br from-blue-400 to-purple-500 text-white rounded-xl px-3 py-1 mr-3 text-xl shadow-lg"
              >
                ✨
              </motion.div>
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
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-2 rounded-lg shadow-lg transition-all"
                >
                  <FiArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-gray-800 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3"></span>
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.name}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={link.href}
                      className="text-gray-600 hover:text-gray-800 transition-all flex items-center group"
                    >
                      <span className="mr-2 text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                      <span className="group-hover:underline underline-offset-4 decoration-2 decoration-blue-400">
                        {link.name}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 mb-12"
        >
          <h4 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-3"></span>
            Get in Touch
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 5, scale: 1.02 }}
                className="flex items-start space-x-3 p-4 rounded-xl hover:bg-white/50 transition-all group"
              >
                <div className="text-blue-500 text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-gray-600 group-hover:text-gray-800 transition-colors">{item.text}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Social Media & Payment Methods */}
        <div className="border-t border-white/10 pt-8 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {/* Social Media */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center space-x-6"
            >
              <span className="text-gray-600 font-medium">Follow us:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  whileHover={{ y: -3, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  href={social.href}
                  aria-label={social.name}
                  className={`text-gray-600 ${social.color} text-2xl transition-all duration-300 p-2 rounded-full hover:bg-white/50`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Payment Methods */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4"
            >
              <span className="text-gray-600 font-medium">We accept:</span>
              {['visa', 'mastercard', 'amex', 'paypal', 'applepay'].map((method, index) => (
                <motion.div
                  key={method}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-14 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm"
                >
                  <img 
                    src={`https://logo.clearbit.com/${method}.com`} 
                    alt={method} 
                    className="h-6 object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          <p>© {currentYear} LuxeCart. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <motion.a 
              href="/privacy" 
              whileHover={{ y: -2 }}
              className="hover:text-gray-700 hover:underline underline-offset-4 decoration-blue-400"
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="/terms" 
              whileHover={{ y: -2 }}
              className="hover:text-gray-700 hover:underline underline-offset-4 decoration-blue-400"
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="/cookies" 
              whileHover={{ y: -2 }}
              className="hover:text-gray-700 hover:underline underline-offset-4 decoration-blue-400"
            >
              Cookie Policy
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;