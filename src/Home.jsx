import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Accordion from './components/Accordion';
import { FaLeaf, FaStar, FaHeart, FaGift, FaRegClock, FaHandsHelping, FaHandSparkles, FaShieldAlt, FaUsers, FaPhone, FaEnvelope, FaStarHalfAlt,FaComments } from 'react-icons/fa';
import { motion, } from 'framer-motion';

import './Home.css';

// const toggleBodyScroll = (disable) => {
//   document.body.style.overflow = disable ? 'hidden' : 'visible';
// };

const Home = () => {
  const sectionRefs = useRef([]);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

 
  const values = [
    { icon: FaLeaf, text: "Natural Ingredients", color: "green" },
    { icon: FaStar, text: "Quality Assurance", color: "yellow" },
    { icon: FaHeart, text: "Customer Love", color: "red" },
    { icon: FaGift, text: "Special Offers", color: "blue" },
    { icon: FaRegClock, text: "Timely Service", color: "purple" },
    { icon: FaHandsHelping, text: "Community Support", color: "teal" },
  ];

  const services = [
    { icon: FaHandSparkles, text: "Personalized Treatments", color: "teal" },
    { icon: FaShieldAlt, text: "Safe & Effective", color: "blue" },
    { icon: FaUsers, text: "Expert Team", color: "green" },
  ];

  const testimonials = [
    {
      text: "Organic by Pooja has completely transformed my skin!",
      name: "Eshita Arora",
      rating: 4,
    },
    {
      text: "I love the special offers and quality of products.",
      name: "Kanika",
      rating: 3,
    },
    {
      text: "The team at Organic by Pooja truly cares about their customers.",
      name: "Nandini Pathak",
      rating: 5,
    },
  ];

  useEffect(() => {
    let lastScrollTop = window.pageYOffset;

    const handleScroll = () => {
      let currentScrollTop = window.pageYOffset;
      setScrollDirection(currentScrollTop < lastScrollTop ? 'up' : 'down');
      lastScrollTop = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = sectionRefs.current;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.classList.contains('already-visible')) {
            entry.target.classList.add(scrollDirection === 'up' ? 'content-visible' : 'content-visible-right');
            entry.target.classList.add('already-visible');
          }
        } else {
          entry.target.classList.remove('already-visible');
        }
      });
    });
  
    sections.forEach((section) => {
      if (section && !section.classList.contains('exclude-animation')) {
        observer.observe(section);
      }
    });
  
    return () => {
      sections.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [scrollDirection]);

  return (
    <div className="relative w-full overflow-hidden bg-gray-50">
      {/* Organic By Pooja Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-100">
  {/* Decorative background elements */}
  <div className="absolute inset-0 overflow-hidden">
    <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#10B981', stopOpacity: 0.1 }} />
          <stop offset="100%" style={{ stopColor: '#14B8A6', stopOpacity: 0.1 }} />
        </linearGradient>
      </defs>
      <circle cx="0" cy="0" r="200" fill="url(#grad1)" />
      <circle cx="100%" cy="100%" r="200" fill="url(#grad1)" />
    </svg>
  </div>

  {/* Background image for mobile and vertical layouts */}
  <div className="absolute inset-0 bg-center bg-cover lg:hidden" style={{ backgroundImage: "url('img/section.jpg')" }}>
    <div className="absolute inset-0 bg-black opacity-50"></div>
  </div>

  <div className="container relative z-10 flex flex-col items-center justify-center min-h-screen px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
      {/* Left column: Content */}
      <div className="text-center lg:text-left">
        <motion.h2 
          className="mb-4 text-sm font-bold tracking-wider uppercase text-emerald-400 lg:text-emerald-600 lg:font-semibold sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Nature's Best Kept Secret
        </motion.h2>
        <motion.h1 
          className="mb-6 text-4xl font-extrabold leading-tight text-white lg:text-gray-900 sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="block italic font-bold">ORGANIC</span>
          <span className="block font-serif italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 lg:from-emerald-600 lg:to-teal-500">BY POOJA</span>
        </motion.h1>
        <motion.p 
          className="max-w-xl mx-auto mb-8 text-lg leading-relaxed text-gray-200 sm:text-xl lg:text-gray-600 lg:mx-0 lg:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Discover the power of nature with our premium organic skincare products, 
          crafted to nourish and rejuvenate your skin naturally.
        </motion.p>
        <motion.div 
          className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.a 
            href="/products" 
            className="px-8 py-3 text-lg font-bold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg sm:text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.a>
          <motion.a 
            href="/Services" 
            className="px-8 py-3 text-lg font-bold transition-all duration-300 bg-white border-2 rounded-full text-emerald-600 border-emerald-600 hover:bg-emerald-50 hover:shadow-lg sm:text-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Our Services
          </motion.a>
        </motion.div>
      </div>

      {/* Right column: Product showcase (hidden on mobile and vertical layouts) */}
      <motion.div 
        className="relative hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative w-full h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden">
          <img 
            src="img/section.jpg" 
            alt="Organic skincare products" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="mb-2 text-2xl font-bold">Featured Products</h3>
            <p className="mb-4">Explore our bestselling organic skincare line</p>
            <a href="/products" className="inline-block px-4 py-2 font-semibold transition-colors duration-300 bg-white rounded-full text-emerald-600 hover:bg-emerald-100">
              View All →
            </a>
          </div>
        </div>
        {/* Floating elements */}
        <motion.div 
          className="absolute flex items-center justify-center w-20 h-20 rounded-full top-4 -left-4 bg-emerald-100"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaLeaf className="text-3xl text-emerald-600" />
        </motion.div>
        <motion.div 
          className="absolute flex items-center justify-center w-24 h-24 bg-teal-100 rounded-full bottom-4 -right-4"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        >
          <FaStar className="text-4xl text-teal-600" />
        </motion.div>
      </motion.div>
    </div>

    {/* Feature highlights (hidden on mobile and vertical layouts) */}
    <motion.div 
      className="hidden grid-cols-1 gap-6 mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:grid"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {[
        { icon: FaLeaf, title: "100% Organic", description: "Pure, natural ingredients" },
        { icon: FaStar, title: "Premium Quality", description: "Carefully crafted formulas" },
        { icon: FaHeart, title: "Cruelty-Free", description: "Kind to animals and skin" }
      ].map((feature, index) => (
        <motion.div 
          key={index}
          className="p-6 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
        >
          <feature.icon className="mb-4 text-4xl text-emerald-500" />
          <h3 className="mb-2 text-xl font-semibold text-gray-800">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
      {/* Services Section */}
      <section className="relative flex items-center justify-center min-h-screen px-4 py-16 bg-gradient-to-br from-teal-50 to-green-100">
  <div className="w-full mx-auto max-w-7xl">
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-12 text-center"
    >
      <h2 className="mb-4 text-3xl font-extrabold text-teal-800 md:text-4xl lg:text-5xl">Our Premium Services</h2>
      <p className="max-w-2xl mx-auto text-base text-teal-600 md:text-lg lg:text-xl">Indulge in luxury and transform your look with our exclusive range of premium beauty services.</p>
    </motion.div>

    <div className="flex flex-wrap -mx-4">
      {[
        { title: 'Luxury Makeup', icon: '💄', desc: 'Experience red carpet-worthy looks with our high-end makeup services.', link: '/makeup' },
        { title: 'Advanced Skin Care', icon: '✨', desc: 'Rejuvenate your skin with cutting-edge treatments and premium products.', link: '/skin-care' },
        { title: 'Couture Hair Styling', icon: '💇‍♀️', desc: 'Get runway-ready hair with our expert styling and coloring services.', link: '/hair-styling' },
        { title: 'Exclusive Product Line', icon: '🛍️', desc: 'Shop our curated collection of luxury beauty and skincare products.', link: '/products' },
        { title: 'VIP Beauty Masterclass', icon: '👩‍🏫', desc: 'Learn from industry experts in our exclusive beauty workshops.', link: '/masterclass' },
        { title: 'Bespoke Nail Artistry', icon: '💅', desc: 'Elevate your style with our custom nail designs and premium extensions.', link: '/nail-art' },
      ].map((service, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="w-full px-4 mb-8 sm:w-1/2 lg:w-1/3"
        >
          <div className="flex flex-col h-full p-6 transition-all duration-300 bg-white border-2 border-teal-200 rounded-lg hover:border-teal-400 hover:shadow-lg">
            <div className="flex items-center mb-4">
              <span className="mr-4 text-4xl">{service.icon}</span>
              <h3 className="text-xl font-bold text-teal-800">{service.title}</h3>
            </div>
            <p className="flex-grow mb-4 text-teal-600">{service.desc}</p>
            <Link 
              to={service.link} 
              className="inline-block px-4 py-2 mt-auto text-sm font-semibold text-teal-600 transition-all duration-300 border-b-2 border-teal-600 hover:text-teal-800 hover:border-teal-800"
            >
              Learn More →
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>
      {/* About Us Section */}
      <section className="relative py-12 sm:py-16 md:py-24 bg-teal-50">
  <div className="container px-4 mx-auto max-w-7xl">
    <h2 className="mb-8 text-3xl font-extrabold text-center text-teal-800 sm:mb-12 md:mb-16 sm:text-4xl md:text-5xl">
      Discover <span className="text-teal-600">Organic by Pooja</span>
    </h2>

    <div className="grid gap-6 mb-8 sm:mb-12 md:mb-16 sm:gap-8 md:grid-cols-2">
    <div className="relative overflow-hidden transition-all duration-500 bg-white shadow-xl rounded-3xl hover:shadow-2xl">
  <div className="absolute top-0 right-0 w-40 h-40 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
  <div className="absolute w-40 h-40 bg-green-100 rounded-full -bottom-8 -left-8 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
  
  <div className="relative p-8 sm:p-10">
    <div className="flex items-center mb-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-green-400">
        <span className="text-2xl font-bold text-white">OP</span>
      </div>
      <h3 className="ml-4 text-3xl font-extrabold text-gray-800 sm:text-4xl">Our Story</h3>
    </div>
    
    <div className="space-y-6">
      <p className="relative text-lg leading-relaxed text-gray-700">
        <span className="absolute top-0 text-5xl text-teal-200 opacity-50 -left-4">"</span>
        Founded in <span className="font-semibold text-teal-600">2019</span>, <span className="font-semibold text-teal-600">Organic by Pooja</span> embarked on a mission to revolutionize skincare with natural, homemade solutions. Our journey from a small initiative to a trusted name in personalized care is a testament to our unwavering commitment to authenticity and quality.
      </p>
      <p className="text-lg leading-relaxed text-gray-700">
        We believe in harnessing the power of nature to bring out your inner beauty, offering a range of organic products and services tailored to your unique needs.
      </p>
    </div>
    
    <div className="flex justify-end mt-8">
      <div className="px-6 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-teal-500 to-green-500">
        Est. 2019
      </div>
    </div>
  </div>
  
  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-teal-400 via-green-400 to-teal-400"></div>
</div>

      <div className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-xl hover:shadow-xl">
        <img src="img/1.jpg" alt="Organic by Pooja" className="object-cover w-full h-48 sm:h-56 md:h-64" />
        <div className="p-6 sm:p-8">
          <h3 className="mb-4 text-2xl font-bold text-teal-800 sm:text-3xl">Our Promise</h3>
          <ul className="space-y-2 text-gray-700 list-disc list-inside">
            <li>100% Natural Ingredients</li>
            <li>Personalized Skincare Solutions</li>
            <li>Eco-friendly Practices</li>
            <li>Cruelty-free Products</li>
          </ul>
        </div>
      </div>
    </div>

    <div className="relative z-10 grid gap-6 mb-16 sm:grid-cols-2 lg:grid-cols-3">
      {['Values', 'Services', 'Testimonials'].map((section) => (
        <button
          key={section}
          className="relative px-8 py-6 overflow-hidden text-xl font-semibold text-white transition-all duration-300 bg-teal-600 shadow-lg group rounded-xl hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
          onClick={() => setActiveSection(section)}
        >
          <span className="relative z-10">{section}</span>
          <div className="absolute inset-0 transition-transform duration-300 origin-left transform scale-x-0 bg-teal-500 group-hover:scale-x-100"></div>
          <div className="absolute top-0 right-0 w-12 h-12 transition-transform duration-300 transform translate-x-full translate-y-full bg-teal-400 rounded-bl-full group-hover:translate-x-0 group-hover:translate-y-0"></div>
        </button>
      ))}
    </div>

    <div className={`transition-all duration-500 overflow-hidden ${activeSection ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="w-full overflow-hidden bg-white shadow-2xl rounded-xl">
        <div className="p-6 sm:p-8">
          <h3 className="mb-6 text-2xl font-bold text-teal-800 sm:text-3xl">{activeSection}</h3>
          {activeSection === 'Values' && (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((item, index) => (
                <div key={index} className="flex flex-col items-center p-4 text-center transition-all duration-300 shadow-md bg-teal-50 rounded-xl sm:p-6 hover:shadow-lg">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 bg-teal-100 rounded-full sm:w-20 sm:h-20">
                    <item.icon className="text-2xl text-teal-600 sm:text-3xl" />
                  </div>
                  <h4 className="mb-2 text-lg font-bold text-teal-800 sm:text-xl">{item.text}</h4>
                  <p className="text-sm text-gray-700 sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              ))}
            </div>
          )}
          {activeSection === 'Services' && (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((item, index) => (
                <div key={index} className="p-4 transition-all duration-300 shadow-md bg-teal-50 rounded-xl sm:p-6 hover:shadow-lg">
                  <item.icon className="mb-4 text-3xl text-teal-600 sm:text-4xl" />
                  <h4 className="mb-2 text-lg font-bold text-teal-800 sm:text-xl">{item.text}</h4>
                  <p className="text-sm text-gray-700 sm:text-base">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              ))}
            </div>
          )}
          {activeSection === 'Testimonials' && (
            <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
              {testimonials.map((item, index) => (
                <div key={index} className="p-4 transition-all duration-300 shadow-md bg-teal-50 rounded-xl sm:p-6 hover:shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center justify-center w-10 h-10 mr-4 bg-teal-200 rounded-full sm:w-12 sm:h-12">
                      <span className="text-xl font-bold text-teal-600 sm:text-2xl">{item.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-teal-800">{item.name}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`${i < item.rating ? 'text-yellow-400' : 'text-gray-300'} text-xs sm:text-sm`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm italic text-gray-700 sm:text-base">"{item.text}"</p>
                </div>
              ))}
            </div>
          )}
          <button
            className="px-4 py-2 mt-6 text-white transition-all duration-300 bg-teal-600 rounded-full sm:mt-8 sm:py-3 sm:px-6 hover:bg-teal-700 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            onClick={() => setActiveSection(null)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Testimonials Section */}
      <section className="py-24 overflow-hidden bg-gradient-to-br from-teal-50 to-green-100">
  <div className="container px-4 mx-auto">
    <motion.h2 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16 text-4xl font-bold text-center text-teal-800 md:text-5xl"
    >
      What Our Clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-500">Love About Us</span>
    </motion.h2>
    
    <div className="relative">
      <div className="absolute top-0 left-0 w-40 h-40 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute w-40 h-40 bg-pink-300 rounded-full -bottom-8 left-20 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      <div className="relative overflow-hidden">
        <div className="flex gap-6 pb-8 scrolling-wrapper">
          {[
            { name: 'Eshita Arora', review: 'The organic products are amazing, and the treatments are top-notch. I feel rejuvenated every time!', img: 'img/sec2.jpg', rating: 5 },
            { name: 'Kanika', review: 'Excellent service and great quality products. Highly recommend for anyone looking to elevate their skincare routine.', img: 'img/sec2.jpg', rating: 4.5 },
            { name: 'Nandini Pathak', review: 'Professional staff and fantastic results. The best salon experience I have ever had!', img: 'img/sec2.jpg', rating: 4 },
            { name: 'Kavita Bhalla', review: 'The organic products are amazing, and the treatments are top-notch. I feel rejuvenated every time!', img: 'img/sec2.jpg', rating: 5 },
            { name: 'Anjali Sharma', review: 'Excellent service and great quality products. Highly recommend for anyone looking to elevate their skincare routine.', img: 'img/sec2.jpg', rating: 4.5 },
            { name: 'Varsha Agarwal', review: 'Professional staff and fantastic results. The best salon experience I have ever had!', img: 'img/sec2.jpg', rating: 4 },
            { name: 'Eshita Arora', review: 'The organic products are amazing, and the treatments are top-notch. I feel rejuvenated every time!', img: 'img/sec2.jpg', rating: 5 },
            { name: 'Kanika', review: 'Excellent service and great quality products. Highly recommend for anyone looking to elevate their skincare routine.', img: 'img/sec2.jpg', rating: 4.5 },
            { name: 'Nandini Pathak', review: 'Professional staff and fantastic results. The best salon experience I have ever had!', img: 'img/sec2.jpg', rating: 4 },
            { name: 'Kavita Bhalla', review: 'The organic products are amazing, and the treatments are top-notch. I feel rejuvenated every time!', img: 'img/sec2.jpg', rating: 5 },
            { name: 'Anjali Sharma', review: 'Excellent service and great quality products. Highly recommend for anyone looking to elevate their skincare routine.', img: 'img/sec2.jpg', rating: 4.5 },
            { name: 'Varsha Agarwal', review: 'Professional staff and fantastic results. The best salon experience I have ever had!', img: 'img/sec2.jpg', rating: 4 },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 p-6 transition-all duration-300 bg-white shadow-xl w-80 rounded-2xl hover:shadow-2xl"
            >
              <div className="flex items-center mb-4">
                <img src={testimonial.img} alt={testimonial.name} className="w-16 h-16 mr-4 border-2 border-teal-500 rounded-full"/>
                <div>
                  <p className="font-semibold text-teal-800">{testimonial.name}</p>
                  <div className="flex items-center">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <FaStar key={i} className="text-sm text-yellow-400"/>
                    ))}
                    {testimonial.rating % 1 !== 0 && <FaStarHalfAlt className="text-sm text-yellow-400"/>}
                  </div>
                </div>
              </div>
              <p className="mb-4 text-sm italic text-gray-600">{testimonial.review}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>
      {/* FAQ Section */}
      <section className="py-16 bg-white" ref={(el) => (sectionRefs.current[7] = el)}>
        <div className="container px-6 mx-auto">
          <h2 className="mb-8 text-3xl font-semibold text-center text-gray-800">Frequently Asked Questions</h2>
          <Accordion />
        </div>
      </section>

      {/* Contact Section */}
      <section ref={el => sectionRefs.current[4] = el} className="relative py-24 overflow-hidden bg-gradient-to-br from-teal-900 to-green-900">
  {/* Animated background */}
  <div className="absolute inset-0 z-0">
    <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml,...')] animate-slide"></div>
    <div className="absolute inset-0 bg-black opacity-50"></div>
  </div>

  <div className="container relative z-10 px-4 mx-auto sm:px-6 lg:px-8">
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mb-16 text-center"
    >
      <h2 className="mb-4 text-5xl font-extrabold tracking-tight text-white">
        Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">Touch</span>
      </h2>
      <p className="max-w-2xl mx-auto text-xl text-teal-100">
        We'd love to hear from you! Reach out for inquiries or to book an appointment.
      </p>
    </motion.div>

    <div className="grid gap-8 md:grid-cols-3">
      {[
        { icon: FaPhone, text: "Call Us", href: "tel:+918171924503" },
        { icon: FaEnvelope, text: "Email Us", href: "mailto:organicbypooja@gmail.com" },
        { icon: FaComments, text: "Contact Us", href: "/contact" }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link 
            to={item.href}
            className="block p-8 transition-all duration-300 transform bg-white/10 backdrop-filter backdrop-blur-lg rounded-2xl hover:bg-white/20 hover:scale-105 group"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl text-white rounded-full bg-gradient-to-r from-teal-500 to-green-500 group-hover:animate-bounce">
              <item.icon />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">{item.text}</h3>
            <p className="text-teal-200 transition-colors duration-300 group-hover:text-white">
              Click to {item.text.toLowerCase()}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>

  {/* Decorative elements */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden">
  </div>
</section>
    </div>
  );
};

export default Home;
                