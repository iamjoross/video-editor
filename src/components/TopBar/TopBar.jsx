import React, { useState, useRef, useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import {store} from '../../store';
import Editable from '../Editable';

import { CameraVideo, CursorText, Soundwave, Pencil } from 'react-bootstrap-icons';

const TopBar = (props) => {
  const { state } = useContext(store);
  const [fileName, setFileName] = useState('Untitled Video');
  const inputRef = useRef();

  return (
    <Row className='d-flex' style={{ flex: 1 }}>
      <Col md={9} className='d-flex align-items-center'>
        <Editable
          text={fileName}
          placeholder='Enter a video name'
          type='input'
          childRef={inputRef}
          className='fileNameInput'
        >
          <Form.Control
            size='large'
            ref={inputRef}
            type='text'
            name='filename'
            placeholder='Enter a video name'
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </Editable>
        {!state.isEditingTitle ? <Pencil color='rgb(222,226,230)'/> : ''}
      </Col>
      <Col md={3} className='d-flex align-items-center justify-content-end'>
        {/* <span className=' ml-2'>Add Item</span>
        <div className='border icon-border icon-video ml-2'>
          <CameraVideo color='rgb(52,220,185)' />
        </div>
        <div className='border icon-border icon-text ml-2'>
          <CursorText color='rgb(250,146,183)' />
        </div>
        <div className='border icon-border icon-text ml-2'>
          <Soundwave color='rgb(255,174,156)' />
        </div> */}

        <Button className='ml-2' variant='primary' size='md'>
          Render
        </Button>
      </Col>
    </Row>
  );
};

export default TopBar;
