import React from 'react';
import { useQuery } from '@apollo/client';
const SingleThought = props => {
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{' '}
          thought on createdAt
        </p>
        <div className="card-body">
          <p>Thought Text</p>
        </div>
      </div>
    </div>
  );
};

export default SingleThought;
