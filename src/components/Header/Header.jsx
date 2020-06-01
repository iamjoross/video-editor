import React, { useState, useRef } from 'react';
import Editable from '../Editable';
import { Row, Col, Input, Button } from 'antd';

import './Header.scss';

const Header = ({ children, ...props }) => {
  const [fileName, setFileName] = useState('Untitled Video');
  const inputRef = useRef();

  return (
    <Row {...props}>
      <Col span={6}>
        <Editable
          text={fileName}
          placeholder='Enter a video name'
          type='input'
          childRef={inputRef}
          className='fileNameInput'
        >
          <Input
            size='large'
            ref={inputRef}
            type='text'
            name='filename'
            placeholder='Enter a video name'
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </Editable>
      </Col>
      <Col span={4} offset={14}>
        <Row justify='end'>
          <Button type='primary' size='large'>
            Render
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
