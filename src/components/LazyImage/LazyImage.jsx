import React, {useRef, useContext} from 'react';
import styled, { keyframes, css } from "styled-components";
import LazyLoad from "react-lazyload";
import { store } from '../../store';


const ImageWrapper = styled.div`
  position: relative;

  ${({ view }) => view === 'list' ?
    css`
      width: 80px;
      height: 80px;
    `
    :
    css`
      width: 100px;
      height: 100px;
    `
}

`;

const loadingAnimation = keyframes`
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #ccc;
  }
  100% {
    background-color: #fff;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAnimation} 1s infinite;
`;

const StyledImage = styled.img`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LazyImage = ({src, alt}) => {
  const { state } = useContext(store);

  const refPlaceholder = useRef();

  const removePlaceholder = () => {
    refPlaceholder.current.remove();
  };

  return (
    <ImageWrapper view={state.currentMediaView}>
      <Placeholder ref={refPlaceholder} />
      <LazyLoad>
        <StyledImage
          onLoad={removePlaceholder}
          onError={removePlaceholder}
          src={src}
          alt={alt}
        />
      </LazyLoad>
    </ImageWrapper>
  );
};

export default LazyImage;
