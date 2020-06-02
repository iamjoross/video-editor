import React, { useState, useRef } from 'react';
import Editable from '../../Editable';
import {
  CameraVideoFill,
  EyeSlashFill,
  LockFill,
  TextareaT,
  Soundwave,
} from 'react-bootstrap-icons';
import TimelineDropTarget from '../TimelineDropTarget';

const TimelineLayer = ({ layer, ...props }) => {
  const [index, { type, title, accept, frames }] = layer;
  const [layerName, setLayerName] = useState(title);
  const inputRef = useRef();

  return (
    <div className={`timeline-layer timeline-layer-${type}`}>
      <div className='timeline-layer__heading'>
        <div className='timeline-layer__heading-icon'>
          {type === 'video' ? (
            <CameraVideoFill />
          ) : type === 'text' ? (
            <TextareaT />
          ) : type === 'audio' ? (
            <Soundwave />
          ) : (
            ''
          )}
        </div>
        <div className='timeline-layer__heading-name'>
          <Editable
            text={layerName}
            placeholder={`Enter a ${type} name`}
            type='input'
            childRef={layerName}
            className='fileNameInput'
          >
            <input
              type='text'
              ref={inputRef}
              name='layerName'
              plaecholder='Enter a layer name'
              value={layerName}
              onChange={(e) => setLayerName(e.target.value)}
            />
          </Editable>
        </div>
        <div className='timeline-layer__heading-options'>
          <EyeSlashFill />
          <LockFill />
        </div>
      </div>
      <TimelineDropTarget
        index={index}
        accept={accept}
        type={type}
        frames={frames}
        title={title}
      />
    </div>
  );
};

export default TimelineLayer;
