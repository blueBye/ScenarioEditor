import * as React from 'react';
import { subject } from '../../service.js'
import {useEffect, useState} from 'react';


const GView = () => {
    const [model, setModel] = useState({});

    subject.subscribe(res=>{
        setModel(res)
    })

    useEffect(() => {
        setModel({asad: 12, dd: 'dd'});
    }, []);

    return (
        <div id="view">
            {Object.keys(model).map((block, index)=>{
                return (
                <ul key={index}>{index}: {JSON.stringify(model[block])}</ul>)
            })}
        </div>
    )

    // let model = {}

    // subject.subscribe(res=>{
    //     console.log(res)
    //     this.obj = res
    // })

    // return (
    //     <div id="view">
    //         {Object.keys(model).map((key,i)=>{
    //             return (<li key={i}>{model[key]}</li>)
    //         })}
    //     </div>
    // )
}

export { GView };