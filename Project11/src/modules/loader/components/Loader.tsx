import * as React from 'react';

export default function Loading({isLoading, pastDelay, error}:{[key:string]:any}) {
  if (isLoading && pastDelay) {
    return <p>Loading...</p>;
  } else if (error && !isLoading) {
    return <p>Error!</p>;
  } else {
    return null;
  }
};