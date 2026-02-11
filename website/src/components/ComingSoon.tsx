import { motion } from 'framer-motion'
import { Github, Linkedin, ArrowRight } from 'lucide-react'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  )
}

interface Props {
  onNavigate: () => void
}

export default function ComingSoon({ onNavigate }: Props) {
  return (
    <div className="relative min-h-screen bg-[#0A0A0B] overflow-hidden">
      {/* Background */}
      <div className="earth-horizon" />
      <div className="earth-horizon-glow" />

      {/* Ambient orb */}
      <motion.div
        className="absolute top-[20%] left-[35%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.025) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 15, -10, 0], y: [0, -10, 8, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content — vertically centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Main block: 4 lines — wordmark, heading, subtitle, button + socials */}
        <div className="flex flex-col items-center">
          {/* Wordmark — gap-5 (20px) to heading, matching browser HomePage */}
          <motion.p
            className="font-display text-xs font-medium tracking-[0.35em] uppercase text-white/20 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Anthracite
          </motion.p>

          {/* Heading */}
          <motion.h1
            className="font-display text-[32px] md:text-[38px] font-extralight text-text-primary/90 tracking-tight text-center leading-snug"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            A different kind of browser.
          </motion.h1>

          {/* Subtitle — mt-3 (12px) from heading, matching browser HomePage */}
          <motion.p
            className="text-sm text-text-tertiary font-light mt-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Coming soon.
          </motion.p>

          {/* CTA — cornered button */}
          <motion.button
            onClick={onNavigate}
            className="group flex items-center gap-2.5 mt-10 px-5 py-2 rounded-xl border border-white/[0.10] text-sm text-text-secondary hover:border-white/[0.20] hover:text-text-primary transition-all duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-light">Get early access</span>
            <ArrowRight className="h-3.5 w-3.5 text-text-tertiary group-hover:text-text-secondary transition-colors duration-300" />
          </motion.button>

          {/* Social links — right under CTA */}
          <motion.div
            className="flex items-center gap-1 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {[
              { href: 'https://github.com/anthropics', icon: <Github className="h-4 w-4" />, label: 'GitHub' },
              { href: 'https://x.com', icon: <XIcon />, label: 'X' },
              { href: 'https://linkedin.com', icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn' },
              { href: 'https://discord.gg', icon: <DiscordIcon />, label: 'Discord' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-white/25 hover:text-white/50 transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Copyright — pinned to bottom */}
        <motion.p
          className="absolute bottom-7 text-[11px] text-white/20 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          &copy; 2025 Anthracite
        </motion.p>
      </div>
    </div>
  )
}
