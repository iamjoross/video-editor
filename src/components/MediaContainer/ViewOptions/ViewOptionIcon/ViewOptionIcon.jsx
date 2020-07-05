import React from 'react';
import { List, Grid } from 'react-bootstrap-icons';
import './ViewOptionIcon.scss';

const ViewOptionIcon = ({icon, handleClick, currentMediaView}) => {

  const viewIcon = icon === 'list'  ? <List data-type="list"/> : <Grid data-type="grid"/>;

  return (
    <button
      className={`view-btn ${
        currentMediaView === icon ? 'active-view' : ''
      } ${
        icon === 'grid' ? 'view-btn-grid' : ''
      }`}
      type='button'
      data-type={icon}
      onClick={handleClick}
    >
      {viewIcon}
    </button>
  );
};

export default ViewOptionIcon;
