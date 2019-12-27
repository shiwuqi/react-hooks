import * as React from 'react';
import WrapTimer from '../../hoc/WrapTimer';
import '../Timer/style.css';

export interface HocTimerPropsType {
    hour: string;
    minute: string;
    second: string;
    className?: string;
}

class HocTimer extends React.Component<HocTimerPropsType, any> {

    render() {
        const { hour, minute, second } = this.props;
        return (
            <div className={`timer-all ${this.props.className}`} >
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
}

export default WrapTimer(HocTimer);