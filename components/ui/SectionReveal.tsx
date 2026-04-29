'use client';

import { motion, MotionProps } from 'framer-motion';

type Direction = 'up' | 'left' | 'right';

interface SectionRevealProps extends MotionProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

const variants = {
  up:    { hidden: { opacity: 0, y: 32 },  visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },  visible: { opacity: 1, x: 0 } },
};

export default function SectionReveal({
  children,
  direction = 'up',
  delay = 0,
  className,
  ...rest
}: SectionRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants[direction]}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
