"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

const NavbarDemo = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState(null)

  const navItems = [
    { name: "Features", link: "#features" },
    { name: "Pricing", link: "#pricing" },
    { name: "Contact", link: "#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  }

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  }

  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <>
      <motion.nav
        className={`bg-black rounded-3xl fixed top-5 left-1/2 transform -translate-x-1/2 w-[90%] max-w-6xl px-4 sm:px-6 lg:px-8 ${
          scrolled ? "shadow-lg" : ""
        }`}
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        style={{
          boxShadow: scrolled ? "0 10px 25px rgba(0, 0, 255, 0.1)" : "none",
        }}
      >
        <div className="flex justify-between items-center text-white h-16">
          <motion.a
            href="#"
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.img
              src="https://assets.aceternity.com/logo-dark.png"
              alt="logo"
              className="h-8 w-8"
              animate={{ rotate: scrolled ? 360 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <motion.span
              className="text-xl font-semibold"
              animate={{ color: scrolled ? "#3b82f6" : "#ffffff" }}
              transition={{ duration: 0.3 }}
            >
              Startup
            </motion.span>
          </motion.a>

          <div className="hidden lg:flex space-x-6">
            {navItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.link}
                className="relative px-3 py-2 rounded-md text-sm font-medium group"
                variants={itemVariants}
                whileHover={{ y: -2 }}
                onMouseEnter={() => setActiveItem(idx)}
                onMouseLeave={() => setActiveItem(null)}
              >
                {item.name}
                <motion.span
                  className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeItem === idx ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              className="px-4 py-2 text-sm font-semibold"
              whileHover={{ scale: 1.05, color: "#3b82f6" }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book a call
            </motion.button>
          </div>

          <div className="lg:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-sm pt-24"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <motion.div
              className="mx-4 p-6 bg-black rounded-xl shadow-lg border border-gray-700"
              initial={{ y: -30 }}
              animate={{ y: 0 }}
              exit={{ y: -30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.link}
                    className="text-white text-lg font-medium py-2 border-b border-gray-700"
                    variants={menuItemVariants}
                    whileHover={{ x: 5, color: "#3b82f6" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  className="px-4 py-3 text-white border border-gray-700 rounded-md"
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.02, color: "#3b82f6" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Login
                </motion.button>
                <motion.button
                  className="px-4 py-3 bg-blue-600 text-white rounded-md"
                  variants={menuItemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book a call
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavbarDemo
