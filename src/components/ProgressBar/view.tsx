import React, {useState, useRef, useMemo, useEffect, useCallback} from 'react';
import './index.less';

const formTimeSecond = (t: number) => {
	t = Math.floor(t) || 0;
	const hs = 60 * 60;
	const h = Math.floor(t / hs);
	const m = Math.floor((t % hs) / 60);
	const s = t - h * hs - m * 60;
	const addZero = (a: any) => {
		if (!a || a === Infinity) {
			return '00';
		}
		return String(a).length === 1 ? `0${a}` : a;
	};
	return `${addZero(m)}:${addZero(s)}`;
};

export default function ProgressBar(props: {
	duration: number;
	currentTime: number;
	handleOnSwitchVideoPlay: (isPlay: boolean) => void;
	handleUpdateVideoTime: (time: number) => void;
}) {
	const draggingRef = useRef(false);
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		setCurrent(props.currentTime);
	}, [props.currentTime]);
	const slideRef = useRef<HTMLDivElement>(null);

	const handleTouchStart = () => {
		window.addEventListener('touchmove', onDragging);
		window.addEventListener('touchend', onDragEnd);
	};

	const onDragging = (event: any) => {
		props.handleOnSwitchVideoPlay(false);
		draggingRef.current = true;
		const second = getTouchSecond(event);
		setCurrent(second);
		props.handleUpdateVideoTime(second);
	};

	const getTouchSecond = (event: any, type = 'touch') => {
		let touchX = 0;
		if (type === 'touch') {
			touchX = event.touches[0].pageX & event.changedTouches[0].pageX & event.targetTouches[0].pageX;
		}
		const silderX = slideRef.current && slideRef.current.getBoundingClientRect().left;
		const silderWidth = slideRef.current?.offsetWidth;
		const persen = (touchX - (silderX as number)) / (silderWidth as number);
		let second = props.duration * persen;
		second = second <= 0 ? 0 : second;
		second = second > (props.duration || 0) ? props.duration : second;
		if (second === props.duration) second = props.duration - 5;
		return second;
	};

	const onDragEnd = async () => {
		draggingRef.current = false;
		props.handleOnSwitchVideoPlay(true);
		window.removeEventListener('touchmove', onDragging);
		window.removeEventListener('touchend', onDragEnd);
	};

	const silderInnerStyle = useMemo(() => {
		let persen = props.duration ? (current / props.duration) * 100 : 0;
		if (persen >= 100) persen = 100;
		return `${persen}%`;
	}, [props.duration, current]);

	return (
		<div className='progressBar'>
			<p className='progressBarTime'>{formTimeSecond(current as any)}</p>
			<div className='progressBarBilderWrap' onTouchStart={() => handleTouchStart()}>
				<div ref={slideRef} className='progressBarSilder'>
					<span className='progressBarSilderInner' style={{width: silderInnerStyle}}></span>
					<span className='progressBarSilderRound' style={{left: silderInnerStyle}}>
						<div></div>
					</span>
				</div>
			</div>
			<p className='progressBarTime'>{formTimeSecond(props.duration)}</p>
		</div>
	);
}
