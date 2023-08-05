// Icons.js
import React from 'react';

export const IconRating = ({ color = 'gold' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color} width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
  </svg>
);

export const IconExperience = () => <span style={{ fontSize: '24px' }}>#</span>;

export const IconCost = () => <span style={{ fontSize: '24px' }}>$</span>;

export const IconUp = () => (
  <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid black' }} />
);

export const IconDown = () => (
  <div style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderTop: '10px solid black' }} />
);