import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

const Button = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  const baseClasses = 'px-6 py-3 rounded-md font-medium shadow-md transition-all duration-300 inline-block';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:shadow-lg hover:bg-primary-dark',
    secondary: 'bg-white text-primary border border-primary hover:shadow-md hover:bg-gray-50',
  };
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;