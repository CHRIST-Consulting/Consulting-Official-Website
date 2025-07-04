import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({ 
  title, 
  subtitle, 
  centered = false,
  className = '' 
}: SectionTitleProps) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg sm:text-xl text-charcoal opacity-80 max-w-3xl ${centered ? 'text-center mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;