import React, { useContext, useState} from 'react';
import {Dropdown} from 'react-bootstrap'
import { store } from '../../../store';
import { CameraVideo, CursorText, Soundwave, Funnel } from 'react-bootstrap-icons';
import { TOGGLE_MEDIA_VIEW, SET_MEDIA_FILTER } from '../../../constants';
import ViewOptionIcon from './ViewOptionIcon';
import './ViewOptions.scss'


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a href="#" ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span>&#x25bc;</span>
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);



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

  const handleSelect = (eventKey) => {
    dispatch({ type: SET_MEDIA_FILTER, payload: eventKey });
  }

  const SelectedFilter = ({...props}) => {

    const matcher = {
      all: Funnel,
      video: CameraVideo,
      audio: Soundwave,
      text: CursorText
    }
    const IconMatched = matcher[state.mediaFilter || 'all'];
    return <IconMatched {...props}/>
  };

  const toggleActive = (type) => {
    if(state.mediaFilter === type) return true;
    return false;
  }


  return (
    <>
      {viewIcons.map((value, index) => {
        return (
          <ViewOptionIcon key={index} icon={value} handleClick={handleClick} currentMediaView={state.currentMediaView} />
        )
      })}
      <Dropdown className="filter__dropdown">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <SelectedFilter className="filter__icon" color='rgb(52,220,185)'/>
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu}>
          <Dropdown.Item eventKey="all" active={toggleActive("all")} onSelect={handleSelect}><Funnel color='rgb(52,220,185)' />All</Dropdown.Item>
          <Dropdown.Item eventKey="video" active={toggleActive("video")} onSelect={handleSelect}><CameraVideo color='rgb(52,220,185)' />Video</Dropdown.Item>
          <Dropdown.Item eventKey="text" active={toggleActive("text")} onSelect={handleSelect}><CursorText color='rgb(250,146,183)' />Text</Dropdown.Item>
          <Dropdown.Item eventKey="audio" active={toggleActive("audio")} onSelect={handleSelect}><Soundwave color='rgb(255,174,156)' />Audio</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ViewOptions;
