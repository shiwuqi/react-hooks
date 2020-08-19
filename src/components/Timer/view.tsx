import * as React from 'react';
import './style.css';
// import useTimer, { TimeType } from '../../hooks/useTimer';
import useTimer, { TimeType } from '@_shiqi/timer';

console.log(useTimer);

function Timer(props: { time?: TimeType; className?: string; }) {
  const date = useTimer({ time: props.time });

  return (
    <div className={`timer-all ${props.className}`} >
      <div className='timer-card' data-type='hours' data-max='24'>
        <h4>{date.hour}</h4>
      </div>
      <div className='timer-card' data-type='minutes' data-max='60'>
        <h4>{date.minute}</h4>
      </div>
      <div className='timer-card' data-type='seconds' data-max='60'>
        <h4>{date.second}</h4>
      </div>
    </div>
  )
}

export default Timer;