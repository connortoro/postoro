"use client"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs"
import { motion } from "framer-motion"

export default function Hero() {
  const btn_class =
    "h-14 w-40 outline-none border border-neutral-700 flex items-center justify-center text-lg font-medium rounded-full hover:bg-neutral-800 transition-colors duration-300 ease-in-out"

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center  pt-[15rem] px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
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
          Where friends come together to really make it happen and everything is good and happy forever
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <LoginLink className={`${btn_class} bg-neutral-100 text-neutral-900 hover:bg-neutral-950 hover:text-neutral-200`}>Login</LoginLink>
          <RegisterLink className={btn_class}>Register</RegisterLink>
        </motion.div>
      </motion.div>
    </div>
  )
}

