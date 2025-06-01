import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  icon,
  fullWidth = false,
  disabled = false,
  type = 'button'
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors duration-200 rounded-md';
  
  const variantStyles = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    secondary: 'bg-gray-700 hover:bg-gray-800 text-white',
    outline: 'border border-gray-600 hover:bg-gray-800 text-gray-200',
    ghost: 'bg-transparent hover:bg-gray-800 text-gray-300'
  };
  
  const sizeStyles = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5'
  };

  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${disabledStyles} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;