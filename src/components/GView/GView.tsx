import * as React from 'react';
import { subject } from '../../service.js'


const GView = () => {
    this.subscription = subject.subscribe(res=>{
        console.log('GVIiew: ' + res)
    })

    return (
        <div id="view"></div>
    )
}

export { GView };