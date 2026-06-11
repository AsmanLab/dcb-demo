'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface Product3DIconProps {
  icon: React.ReactNode;
}

export function Product3DIcon({ icon }: Product3DIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotateY: 8, rotateX: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FF3355 0%, #E4002B 50%, #B3001B 100%)',
        boxShadow: '0 10px 40px -10px rgba(228,0,43,0.5)',
      }}
      aria-hidden="true"
    >
      {/* Highlight */}
      <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
      <span className="relative z-10 text-white">{icon}</span>
    </motion.div>
  );
}
