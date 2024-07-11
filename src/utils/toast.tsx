import React from 'react';

const toast = (message: React.ReactNode) => {
  return (
    <div className="toast-style" role="alert">
      {message}
    </div>
  );
};

export default toast;
