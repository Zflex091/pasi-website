'use client'

import { motion } from 'framer-motion'

const users = [
  { rank: 4, username: 'Blade', wagered: '$5,500', reward: '$80' },
  { rank: 5, username: 'Shadow', wagered: '$4,900', reward: '$70' },
  { rank: 6, username: 'Luna', wagered: '$4,200', reward: '$60' },
  { rank: 7, username: 'Venom', wagered: '$3,900', reward: '$50' },
  { rank: 8, username: 'Raze', wagered: '$3,500', reward: '$40' },
  { rank: 9, username: 'Ghosty', wagered: '$3,100', reward: '$30' },
  { rank: 10, username: 'Toxic', wagered: '$2,900', reward: '$20' }
]

export default function Leaderboard() {
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
            Rankings
          </p>

          <h2 className="text-5xl font-black text-white">
            TOP 10 PLAYERS
          </h2>
        </div>

        <div className="space-y-4">
          {users.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.01,
                y: -2
              }}
              className="
                flex items-center justify-between
                rounded-3xl border border-white/10
                bg-white/[0.03]
                px-6 py-5
                backdrop-blur-xl
                transition-all duration-300
                hover:border-cyan-400/20
                hover:bg-cyan-400/[0.03]
              "
            >
              <div className="flex items-center gap-5">
                <div className="
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl bg-cyan-400/10
                  text-xl font-black text-cyan-400
                ">
                  #{user.rank}
                </div>

                <div>
                  <p className="text-lg font-bold text-white">
                    {user.username}
                  </p>

                  <p className="text-sm text-zinc-500">
                    Weekly competitor
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="text-right">
                  <p className="text-sm text-zinc-500">
                    Wagered
                  </p>

                  <p className="text-xl font-black text-white">
                    {user.wagered}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-zinc-500">
                    Reward
                  </p>

                  <p className="text-xl font-black text-cyan-300">
                    {user.reward}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}