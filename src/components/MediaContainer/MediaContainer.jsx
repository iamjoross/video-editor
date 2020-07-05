import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MediaList from './MediaList';
import ViewOptions from './ViewOptions';
import styled from "styled-components";
import './MediaContainer.scss';

const MediaHeader = styled(Row)`
  min-height: 80px;
`;

const MediaContainer = ({ media, droppedMedia, ...props }) => {
  return (
    <Container className='d-flex h-100 flex-column'>
      <MediaHeader className='d-flex align-items-center'>
        <Col className="p-0">Medias</Col>
        <Col className="p-0 align-items-right d-flex justify-content-end flex-row">
          <ViewOptions />
        </Col>
      </MediaHeader>
      <Row
        className='d-flex justify-content-start media-container overflow-auto justify-content-between'
      >
        <MediaList media={media} droppedMedia={droppedMedia} />
      </Row>
    </Container>
  );
};

export default MediaContainer;
