import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({ id, label, containerClassName = '', ...props }) => {
  const baseClasses = "w-full bg-brand-dark border border-brand-light-2 text-brand-light rounded-md p-3 focus:ring-brand-gold focus:border-brand-gold transition-colors duration-300";

  return (
    <div className={containerClassName}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-brand-light-2 mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        className={baseClasses}
        {...props}
      />
    </div>
  );
};

export default Input;