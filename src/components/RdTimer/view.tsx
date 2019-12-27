import * as React from 'react';
import RenderTimer from '../../render/RenderTimer';
import RTimer from './RTime';

export default function RdTimer() {
    return (
        <RenderTimer render={data => (
            <RTimer {...data} />
        )} />
    )
}