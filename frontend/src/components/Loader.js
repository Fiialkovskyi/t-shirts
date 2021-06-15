import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ marginTop = 'mt-4' }) => {
  return (
    <div className={`${marginTop} text-center`}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
