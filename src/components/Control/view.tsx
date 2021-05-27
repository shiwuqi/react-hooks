import React from 'react';
import ProgressBar from '../ProgressBar';
import './index.less';
const pause = require('@/assets/img/audio/video-pause.png');
const play = require('@/assets/img/audio/video-play.png');

export default function Control(props: {
	duration: number;
	isPlaying: boolean;
	handleOnSwitchVideoPlay: (isPlay: boolean) => void;
	currentTime: number;
	handleUpdateVideoTime: (time: number) => void;
	handleOnFullScreen: Function;
	style?: React.CSSProperties;
}) {
	return (
		<div className='control' style={props.style}>
			<div className='left'>
				<button>
					<img
						src={props.isPlaying ? play : pause}
						alt=""
						onClick={() => props.handleOnSwitchVideoPlay(!props.isPlaying)}
					/>
				</button>
			</div>
			<ProgressBar
				duration={props.duration}
				currentTime={props.currentTime}
				handleOnSwitchVideoPlay={props.handleOnSwitchVideoPlay}
				handleUpdateVideoTime={props.handleUpdateVideoTime}
			/>
			<div className='right'>
				<button id="fullscreen" onClick={() => props.handleOnFullScreen()}>
					<img src={require('@/assets/img/audio/fullscreen.png')} alt="" />
				</button>
			</div>
		</div>
	);
}
