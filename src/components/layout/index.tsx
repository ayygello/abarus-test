import React from 'react';
import './styles.css';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className='layout'>
      <div className='layout__content'>{children}</div>
    </div>
  );
}

export default React.memo(Layout);
