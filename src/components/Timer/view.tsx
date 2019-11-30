import * as React from 'react';
import './style.css';
const { useState, useEffect } = React;
let timer: NodeJS.Timer | null = null;

// 月份及日期前面添加0
export var addZero = function (val: string | number) {
  return Number(val) < 10 ? '0' + Number(val) : val.toString();
}

export interface TimeType {
  hour: string;
  minute: string;
  second: string;
}

function Timer(props: { time?: TimeType }) {
  const [date, setDate] = useState({
    hour: '00',
    minute: '00',
    second: '00',
  })

  useEffect(() => {
    if (timer) clearInterval(timer);
    if (props.time) setDate(props.time);
    countDown();
    return () => {
      if (timer) clearInterval(timer);
    }
  }, [props.time]);

  // 倒计时
  const countDown = () => {
    timer = setInterval(() => {
      setDate((date: TimeType) => {
        let { hour, minute, second } = date;
        if (second >= '59') {
          second = '00';
          const newMinute = Number(minute) + 1;
          minute = newMinute > 9 ? newMinute.toString() : addZero(newMinute);
        } else if (minute >= '59') {
          minute = '00';
          const newHour = Number(hour) + 1;
          hour = newHour > 9 ? newHour.toString() : addZero(newHour);
        } else {
          const newSecond = Number(second) + 1;
          second = newSecond > 9 ? newSecond.toString() : addZero(newSecond);
        }
        return {
          hour,
          minute,
          second,
        }
      })
    }, 1000)
  };

  return (
    <div className='timer-all' >
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