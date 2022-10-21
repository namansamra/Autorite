import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

export default function SplashScreen({ loading = false }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <PropagateLoader size={15} color={'#0E3F8C'} loading={loading} />
    </div>
  );
}
