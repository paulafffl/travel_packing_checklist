import React from 'react';

interface IconProps {
  symbol?: string;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ symbol = 'add', color = 'white' }) => {
  const iconToBeDisplayed = () => {
    if (symbol === 'add') {
      return <span className="mb-0.5 mr-1 p-0 text-lg leading-none">{'+'}</span>;
    } else {
      let pathD = '';
      switch (symbol) {
        case 'edit':
          pathD =
            'M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z';
          break;
        case 'delete':
          pathD =
            'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z';
          break;
        case 'download':
          pathD =
            'M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z';
          break;
        case 'upload':
          pathD =
            'M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z';
          break;
        default:
          break;
      }
      return (
        <svg
          className="mb-0.5 mr-1 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d={pathD} fill={color} />
        </svg>
      );
    }
  };

  return iconToBeDisplayed();
};

export default Icon;
