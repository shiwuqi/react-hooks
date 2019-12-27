import * as React from 'react';

export interface RTimerPropsType {
    hour: string;
    minute: string;
    second: string;
    className?: string;
}

export default function RTimer(props: RTimerPropsType) {
    const { hour, minute, second } = props;
    return (
        <div className={`timer-all ${props.className}`} >
            <div className='timer-card' data-type='hours' data-max='24'>
                <h4>{hour}</h4>
            </div>
            <div className='timer-card' data-type='minutes' data-max='60'>
                <h4>{minute}</h4>
            </div>
            <div className='timer-card' data-type='seconds' data-max='60'>
                <h4>{second}</h4>
            </div>
        </div>
    )
}