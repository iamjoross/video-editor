import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MediaList from './MediaList';
import ViewOptions from './ViewOptions';
import { CloudUpload } from 'react-bootstrap-icons';
import './MediaContainer.scss';

const MediaContainer = ({ media, droppedMedia, ...props }) => {
  return (
    <Container className='d-flex h-100 flex-column'>
      <Row className='d-flex align-items-center' style={{ height: '80px' }}>
        <Col className="p-0">Medias</Col>
        <Col className="p-0 align-items-right d-flex justify-content-end flex-row">
          <ViewOptions />
          {/* <div className='ml-2'>
            |
          </div>
          <div className='ml-2'>
            <CloudUpload/>
          </div> */}
        </Col>
      </Row>
      <Row
        className='d-flex justify-content-start media-container overflow-auto justify-content-between'
        // style={{ flex: 9 }}
      >
        <MediaList media={media} droppedMedia={droppedMedia} />
      </Row>
    </Container>
  );
};

export default MediaContainer;
