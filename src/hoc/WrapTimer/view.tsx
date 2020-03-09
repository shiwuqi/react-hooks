import * as React from 'react';
import { addZero } from '../../utils/util';

export interface TimeType {
    hour: string;
    minute: string;
    second: string;
}
export type WrapTimerPropsType = {
    time?: TimeType;
}

const WrapTimer = (WrapComponent: React.ComponentType<any>) => {
    return class extends React.Component<WrapTimerPropsType, TimeType> {
        timer: NodeJS.Timer | null = null;
        constructor(props: any) {
            super(props);
            this.state = {
                hour: '00',
                minute: '00',
                second: '00',
            }
            this.timer = null
        }

        componentDidMount() {
            this.timer && clearInterval(this.timer);
            if (this.props.time) {
                this.setState({
                    ...this.props.time
                }, () => {
                    this.countDown();
                })
            } else {
                this.countDown();
            }
        }

        countDown = () => {
            this.timer = setInterval(() => {
                this.setState((state: TimeType) => {
                    let { hour, minute, second } = state;
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

        componentWillUnmount() {
            this.timer && clearInterval(this.timer);
        }

        render() {
            return (
                <WrapComponent {...this.state} />
            )
        }
    }
}

export default WrapTimer;