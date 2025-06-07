import React, { Suspense } from 'react';

interface LoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const Loader = ({ children, fallback = <div>Loading...</div> }: LoaderProps) => {
  return <Suspense fallback={ fallback }>{ children }</Suspense>;
};

export default Loader;