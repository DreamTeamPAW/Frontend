import { hamburgerButtonStyle } from '@/styles/classes';
import React from 'react';

interface HamburgerButtonProps {
  open: boolean;
  onClick: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ open, onClick }) => (
  <button
    type="button"
    aria-label="Toggle menu"
    aria-expanded={open}
    onClick={onClick}
    className={hamburgerButtonStyle}
  >
    <div className={`w-[60%] h-[4px] rounded-sm transition-all duration-300 origin-left
      ${open ? 'rotate-[41deg]  bg-[#685752]' : 'bg-[#685752] translate-y-0'}`} />
    <div className={`w-[60%] h-[4px] rounded-md transition-all duration-300 origin-center
      ${open ? 'opacity-0' : 'bg-[#685752] opacity-100'}`} />
    <div className={`w-[60%] h-[4px] rounded-md transition-all duration-300 origin-left
      ${open ? 'rotate-[-41deg]  bg-[#685752]' : 'bg-[#685752] -translate-y-0'}`} />
  </button>
);

export default HamburgerButton;
