import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';
import {
  ADD_FRAME_TO_LAYER,
  UPDATE_FRAME_COORD,
  UPDATE_WAS_DRAGGING_FRAME,
  UPDATE_CURRENT_DRAGGED_FRAME,
  TOGGLE_MEDIA_VIEW
} from './constants';
import 'holderjs';

var layers = [
  {
    id: uuidv4(),
    title: 'layer 1',
    type: 'video',
    accept: 'video',
    lastDroppedItem: null,
    frames: {},
  },
  {
    id: uuidv4(),
    title: 'layer 2',
    type: 'audio',
    accept: 'audio',
    lastDroppedItem: null,
    frames: {},
  },
  {
    id: uuidv4(),
    title: 'layer 3',
    type: 'text',
    accept: 'text',
    lastDroppedItem: null,
    frames: {},
  },
];

const media = {
  'media-1': {
    id: 1,
    image: 'https://picsum.photos/100/100?random=1',
    type: 'video',
    fileName: '1.jpg',
    origDuration: 300,
  },
  'media-2': {
    id: 2,
    image: 'https://picsum.photos/100/100?random=2',
    type: 'audio',
    fileName: '1.jpg',
    origDuration: 20,
  },
  'media-3': {
    id: 3,
    image: 'https://picsum.photos/100/100?random=3',
    type: 'text',
    fileName: '1.jpg',
    origDuration: 150,
  },
  'media-4': {
    id: 4,
    image: 'https://picsum.photos/100/100?random=4',
    type: 'video',
    fileName: '1.jpg',
    origDuration: 90,
  },
  'media-5': {
    id: 5,
    image: 'https://picsum.photos/100/100?random=5',
    type: 'video',
    fileName: '1.jpg',
    origDuration: 65,
  },
  'media-6': {
    id: 6,
    image: 'https://picsum.photos/100/100?random=6',
    type: 'text',
    fileName: '1.jpg',
    origDuration: 100,
  },
};

const initState = {
  currentMediaView: 'list',
  layers,
  media,
  currentDraggedItem: {},
  wasDraggingFrame: false,
};

const store = createContext(initState);
const { Provider } = store;

const reducer = (state, action) => {
  const mediaType = action.payload.mediaType;
  const layerIndex = mediaType === 'video' ? 0 : mediaType === 'audio' ? 1 : 2;

  switch (action.type) {
    case TOGGLE_MEDIA_VIEW:
      return update(state, {
        currentMediaView: { $set: action.payload },
      });

    case ADD_FRAME_TO_LAYER:
      delete action.payload.mediaType;
      return update(state, {
        layers: { [layerIndex]: { frames: { $merge: { ...action.payload } } } },
      });

    case UPDATE_FRAME_COORD:
      return update(state, {
        layers: {
          [layerIndex]: {
            frames: {
              [action.payload.key]: {
                coords: { x: { $set: action.payload.x } },
              },
            },
          },
        },
      });

    case UPDATE_WAS_DRAGGING_FRAME:
      return update(state, {
        wasDraggingFrame: { $set: action.payload },
      });

    case UPDATE_CURRENT_DRAGGED_FRAME:
      return update(state, {
        currentDraggedItem: { $set: action.payload },
      });
    default:
      throw new Error();
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
