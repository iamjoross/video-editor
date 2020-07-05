import React, {useContext} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from "styled-components";
import MediaList from './MediaList';
import ViewOptions from './ViewOptions';
import {store} from '../../store';

const MediaHeader = styled(Row)`
  min-height: 80px;
`;

const MediaItemsContainer = styled.div`
  width: 320px;
  margin-left: -15px;
  display: grid!important;
  grid-template-columns: ${props => (props.view === "grid") ? "100px 100px 100px" : "320px"};
  grid-gap: 10px;
  overflow: auto;
`;

const MediaContainer = ({ media, droppedMedia, ...props }) => {
  const { state } = useContext(store);
  const variableAttribute =  { view: state.currentMediaView} ;

  return (
    <Container className='d-flex h-100 flex-column'>
      <MediaHeader className='d-flex align-items-center'>
        <Col className="p-0">Medias</Col>
        <Col className="p-0 align-items-right d-flex justify-content-end flex-row">
          <ViewOptions />
        </Col>
      </MediaHeader>
      <MediaItemsContainer {...variableAttribute}>
        <MediaList media={media} droppedMedia={droppedMedia} />
      </MediaItemsContainer>
    </Container>
  );
};

export default MediaContainer;
