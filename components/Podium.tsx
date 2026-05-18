'use client'

import { motion } from 'framer-motion'

const players = [
  {
    place: '2ND',
    username: 'Ghost',
    wagered: '$9,200',
    reward: '$250'
  },
  {
    place: '1ST',
    username: 'Pasi',
    wagered: '$12,500',
    reward: '$500'
  },
  {
    place: '3RD',
    username: 'Nova',
    wagered: '$7,100',
    reward: '$100'
  }
]

export default function Podium() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-cyan-400">
            Weekly Competition
          </p>

          <h2 className="text-6xl font-black tracking-tight text-white">
            TOP PLAYERS
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500">
            The highest wagered users under Pasi’s code this week.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {players.map((player, index) => (
            <motion.div
              key={player.username}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              whileHover={{
                y: -8,
                scale: 1.02
              }}
              className={`
                relative overflow-hidden rounded-[32px]
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-2xl
                transition-all duration-300
                hover:border-cyan-400/30
                hover:shadow-[0_0_60px_rgba(34,211,238,0.12)]
                ${index === 1 ? 'md:-translate-y-6' : ''}
              `}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/[0.03] to-transparent" />

              <div className="relative p-10">
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                      Position
                    </p>

                    <h3 className="mt-2 text-5xl font-black text-cyan-400">
                      {player.place}
                    </h3>
                  </div>

                  <div className="h-14 w-14 rounded-2xl bg-cyan-400/10 blur-xl" />
                </div>

                <div className="mb-10">
                  <h2 className="text-4xl font-black text-white">
                    {player.username}
                  </h2>

                  <p className="mt-6 text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Total Wagered
                  </p>

                  <p className="mt-2 text-5xl font-black text-white">
                    {player.wagered}
                  </p>
                </div>

                <div className="rounded-3xl border border-cyan-400/10 bg-cyan-400/[0.05] p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Reward
                  </p>

                  <p className="mt-2 text-4xl font-black text-cyan-300">
                    {player.reward}
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