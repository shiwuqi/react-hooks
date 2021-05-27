import React, { useState, useRef, useEffect } from 'react';
import Control from '../Control';
import './index.less';
let timer: number | null = null;
let endTimer: number | null = null;

export default function Video() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [process, setProcess] = useState(0);
    const [isHidden, setIsHidden] = useState(false);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isClick, setIsClick] = useState(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    useEffect(() => {
		// 视频时长变化
		videoRef.current?.addEventListener('durationchange', durationchange);
		// 视频播放结束
		videoRef.current?.addEventListener('ended', onVideoEnded);
		// 播放开始执行的函数
		videoRef.current?.addEventListener('play', play);
		// 暂停开始执行的函数
		videoRef.current?.addEventListener('pause', pause);

		return () => {
			videoRef.current?.removeEventListener('durationchange', durationchange);
			videoRef.current?.removeEventListener('ended', onVideoEnded);
			videoRef.current?.removeEventListener('play', play);
			videoRef.current?.removeEventListener('pause', pause);
		};
	}, [videoRef.current]);

    useEffect(() => {
		if (isPlaying) {
			timer && clearTimeout(timer);
			timer = window.setTimeout(() => {
				setIsHidden(true);
			}, 3000);
		}
	}, [isClick, isPlaying]);

    const durationchange = () => {
		setDuration(videoRef.current?.duration || 0);
	};

    const onVideoEnded = () => {
		// 频繁拖动会多次触发
		if (endTimer) {
			window.clearTimeout(endTimer);
		}
		endTimer = window.setTimeout(() => {
			setIsPlaying(false);
		}, 500);
	};

    const play = () => {
		setIsPlaying(true);
	};

	const pause = () => {
		setIsPlaying(false);
	};

    const onVideoPlay = () => {
		setIsPlaying(true);
		videoRef.current?.play();
	};

	const onVideoPause = () => {
		setIsPlaying(false);
		videoRef.current?.pause();
	};

    const handleOnSwitchVideoPlay = (isPlay: boolean) => {
		if (isPlay) {
			onVideoPlay();
		} else {
			onVideoPause();
		}
		setIsClick(val => ++val);
	};

    const handleUpdateVideoTime = (time: number) => {
		videoRef.current && (videoRef.current.currentTime = time);
	};

    // 全屏
	const handleOnFullScreen = () => {
		const t = document.querySelector('#video') as any;
		const res = t.requestFullscreen
			? t.requestFullscreen()
			: t.mozRequestFullScreen
			? t.mozRequestFullScreen()
			: t.webkitRequestFullscreen
			? t.webkitRequestFullscreen()
			: t.webkitEnterFullscreen && t.webkitEnterFullscreen();
	};

    return (
        <div className='video'>
            <video
                src=""
                width="100%"
                ref={videoRef}
                id="video"
                controls={false}
                preload="load"
                onLoadedMetadata={() => {
                    if (process > 0) {
                        const d = videoRef.current && (videoRef.current.duration) || null;
                        if (d) {
                            videoRef.current && (videoRef.current.currentTime = Math.floor(d * process));
                        }
                    }
                }}
                controlsList="nodownload noremoteplayback"
                webkit-playsinline="true"
				playsInline={true}
                x5-video-player-fullscreen="true"
				t7-video-player-type="inline"
            ></video>
            <Control
				style={isHidden ? {visibility: 'hidden', opacity: 0} : {visibility: 'visible', opacity: 1}}
				duration={duration}
				isPlaying={isPlaying}
				handleOnSwitchVideoPlay={handleOnSwitchVideoPlay}
				currentTime={currentTime}
				handleUpdateVideoTime={handleUpdateVideoTime}
				handleOnFullScreen={handleOnFullScreen}
			/>
        </div>
    )
}