'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pb-24 pt-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
          Official Leaderboard
        </p>

        <h1 className="max-w-6xl text-6xl font-black leading-none tracking-tight text-white md:text-8xl">
          PASI LEADERBOARD
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400">
          Compete for top positions, earn weekly rewards and dominate the rankings.
        </p>

        <motion.button
          whileHover={{
            scale: 1.03
          }}
          whileTap={{
            scale: 0.98
          }}
          className="
            mt-10 rounded-2xl
            border border-cyan-400/20
            bg-cyan-400 px-10 py-4
            font-bold text-black
            shadow-[0_0_40px_rgba(34,211,238,0.35)]
            transition-all duration-300
          "
        >
          VIEW RANKINGS
        </motion.button>
      </motion.div>
    </section>
  )
}