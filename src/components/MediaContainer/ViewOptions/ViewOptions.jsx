import React, { useContext} from 'react';
import { store } from '../../../store';
import { TOGGLE_MEDIA_VIEW } from '../../../constants';
import ViewOptionIcon from './ViewOptionIcon';
import './ViewOptions.scss'



const ViewOptions = (props) => {
  const { state, dispatch } = useContext(store);

  const handleClick = (evt) => {
    let currentActive = evt.target.dataset.type === 'grid' && state.currentMediaView === 'list' ? 'grid'
                      : evt.target.dataset.type === 'list' && state.currentMediaView === 'grid' ? 'list' : state.currentMediaView;
    if(state.currentMediaView !== currentActive){
      dispatch({
        type: TOGGLE_MEDIA_VIEW,
        payload: currentActive,
      });
    }
  }

  const viewIcons = ['list', 'grid'];

  return (
    <>
    {viewIcons.map((value, index) => {
      return (
        <ViewOptionIcon key={index} icon={value} handleClick={handleClick} currentMediaView={state.currentMediaView} />
      )
    })}
    </>
  );
};

export default ViewOptions;
