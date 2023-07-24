import {Provider} from 'react-redux';

export const incrementCounter = data => {
  return {
    type: 'INCREASE',
    data: data,
  };
};

export const decrementCounter = () => {
  return {
    type: 'DECREASE',
  };
};
