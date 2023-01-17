import * as React from 'react';
import { subject } from '../../service.js'


const GView = () => {
    const [model, setModel] = React.useState(0);

    subject.subscribe(res=>{
        console.log(res)
        setModel(res)
    })

    return (
        <div id="view">
            {Object.keys(model).map((key,i)=>{
                return (<li key={i}>{model[key]}</li>)
            })}
        </div>
    )
}

export { GView };

