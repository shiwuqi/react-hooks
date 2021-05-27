import React from 'react';
import Index from './router';
import './App.css';
import { Player, ControlBar, FullscreenToggle } from 'video-react';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Index /> */}
      <Player src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
      <ControlBar autoHide={false} FullscreenToggle={true}  className="my-class" />
    </Player>
    </div>
  );
}

export default App;
