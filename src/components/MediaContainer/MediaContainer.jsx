import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MediaList from './MediaList';

const MediaContainer = ({ media, droppedMedia, ...props }) => {
  return (
    <Container className='d-flex h-100 flex-column'>
      <Row className='d-flex align-items-center' style={{ flex: 2 }}>
        Medias
      </Row>
      <Row
        className='d-flex justify-content-start media-container overflow-auto justify-content-between'
        style={{ flex: 9 }}
      >
        <MediaList media={media} droppedMedia={droppedMedia} />
      </Row>
    </Container>
  );
};

export default MediaContainer;
