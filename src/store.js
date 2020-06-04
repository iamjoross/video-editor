import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import update from 'immutability-helper';
import {
  ADD_FRAME_TO_LAYER,
  UPDATE_FRAME_COORD,
  UPDATE_WAS_DRAGGING_FRAME,
  UPDATE_CURRENT_DRAGGED_FRAME,
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
    image: 'holder.js/150x100?theme=sky',
    type: 'video',
    origDuration: 300,
  },
  'media-2': {
    image: 'holder.js/150x100?theme=vine',
    type: 'audio',
    origDuration: 20,
  },
  'media-3': {
    image: 'holder.js/150x100?theme=lava',
    type: 'text',
    origDuration: 150,
  },
  'media-4': {
    image: 'holder.js/150x100?theme=sky',
    type: 'video',
    origDuration: 90,
  },
  'media-5': {
    image: 'holder.js/150x100?theme=sky',
    type: 'video',
    origDuration: 65,
  },
  'media-6': {
    image: 'holder.js/150x100?theme=lava',
    type: 'text',
    origDuration: 100,
  },
};

const initState = {
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
