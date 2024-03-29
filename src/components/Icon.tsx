import React from 'react';

type IconProps = {
  symbol: string;
  color?: string;
};

const Icon = ({ symbol, color = 'white' }: IconProps) => {
  const iconToBeDisplayed = () => {
    let pathD = '';
    switch (symbol) {
      case 'close':
        pathD =
          'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z';
        break;
      case 'collapse':
        pathD = 'm296-345-56-56 240-240 240 240-56 56-184-184-184 184Z';
        break;
      case 'delete':
        pathD =
          'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z';
        break;
      case 'edit':
        pathD =
          'M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z';
        break;
      case 'expand':
        pathD = 'M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z';
        break;
      case 'save':
        pathD =
          'M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z';
        break;
      default:
        break;
    }
    return (
      <svg
        className="m-0 mb-0.2 h-4 w-4 p-0"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d={pathD} fill={color} />
      </svg>
    );
  };

  return iconToBeDisplayed();
};

export default Icon;
