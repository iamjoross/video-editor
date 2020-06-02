import React, { useContext } from 'react';
import TimelineRuler from './TimelineRuler';
import TimelineLayer from './TimelineLayer';
import { store } from '../../store';
import './Timeline.scss';

const Timeline = ({ layers, ...props }) => {
  const { state } = useContext(store);
  return (
    <div className='timeline'>
      <div className='timeline__container'>
        <div className='timeline__container-header'>
          <div>00:00:01:56</div>
          <div>
            <TimelineRuler />
          </div>
        </div>
        <div className='timeline__container__layers-container'>
          {Object.entries(state.layers).map((layer, index) => {
            return <TimelineLayer key={index} layer={layer} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
