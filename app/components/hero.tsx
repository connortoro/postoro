"use client"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { motion } from "framer-motion"

export default function Hero() {
  const btn_class =
    "h-14 w-40 outline-none border border-neutral-700 flex items-center justify-center text-lg font-medium rounded-full hover:bg-neutral-800 transition-colors duration-300 ease-in-out"

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center pt-[5rem] pb-24 px-4 sm:px-6 lg:px-8">
      {/* Main Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24" // Added margin-bottom here
      >
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-9xl font-extrabold tracking-tight mb-4
                     bg-gradient-to-r from-green-100 to-blue-100 bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          ToroPost
        </motion.h1>
        <motion.p
          className="text-xl sm:text-xl text-neutral-400 my-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Where friends come together to really make it happen and everything is
          good and happy forever
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <LoginLink
            className={`${btn_class} bg-neutral-100 text-neutral-900 hover:bg-neutral-950 hover:text-neutral-200`}
          >
            Login
          </LoginLink>
          <RegisterLink className={btn_class}>Register</RegisterLink>
        </motion.div>
      </motion.div>

      {/* Review Section - Using Grid */}
      <motion.div
        className="w-[70%] max-w-6xl mx-auto px-4" // Adjusted max-width and padding
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <div className="flex flex-row">
          {/* Review 1 */}
          <div className="text-center p-6 border-none outline-none">
            <blockquote className="text-sm italic text-neutral-400 leading-relaxed mb-4">
              "The most intuitive platform for genuine connection we've seen
              this year."
            </blockquote>
            <p className="text-sm text-neutral-400">- Wires</p>
          </div>

          {/* Review 2 */}
          <div className="text-center p-6 border-none outline-none">
            <blockquote className="text-sm italic text-neutral-400 leading-relaxed mb-4">
              "We are shocked to the bone with the level of beauty and excellence in this website. Truly breathtaking"
            </blockquote>
            <p className="text-sm text-neutral-400">- Oplio</p>
          </div>


          {/* Review 3 */}
          <div className="text-center p-6 border-none outline-none">
            <blockquote className="text-sm italic text-neutral-400 leading-relaxed mb-4">
              "The masterfullness of this website caused a mental breakdown which I'm still recovering from."
            </blockquote>
            <p className="text-sm text-neutral-400">- Techolomon</p>
          </div>

        </div>
      </motion.div>
    </div>
  )
}
