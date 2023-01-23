import './GView.css'
import * as React from 'react';
import {useEffect, useState} from 'react';
import { modelSubject, mouseSubject, revealSubject } from '../../service.js'
import { Codegen } from '../Codegen/Codegen'


const GView = () => {
    const [model, setModel] = useState({});
    const [selected, setSelected] = useState("");

    modelSubject.subscribe(res=>{
        setModel(res)
    })

    // when clicking on editor the block opens in GView
    mouseSubject.subscribe(line=>{        
        Object.keys(model).map((block, i)=>{
            if(model[block]['_line_start'] <= line.lineNumber) {
                if(model[block]['_line_stop'] >= line.lineNumber) {
                    setSelected(block)
                }
            }
        })
    })

    useEffect(() => {
        setModel({temp: ''});
    }, []);

    // when clicking on a box in GView, reveal it on editor
    const selectBox = (target) => {
        revealSubject.next({
            start: model[target]['_line_start'],
            stop: model[target]['_line_stop']
        })

        setSelected(target)
    }

    return (
        <div id="view" className='view'>
            <Codegen model={model} />
            <nav className="arrows">
        
            {Object.keys(model).map((block, i)=>{
                return (
                    <div>
                        <input type="radio" name="accordion" id={block} checked={block == selected} />
                        <section className="box" onClick={()=>selectBox(block)}>
                            <label className="box-title" htmlFor={block} >{model[block]['type']}</label>
                            <label className="box-close" htmlFor="acc-close"></label>
                            <div className="box-content">
                                {Object.keys(model[block]).filter((n)=>!n.startsWith('_')).map((field, j)=> {
                                    return (
                                        <li>
                                            <span className="field-name">{field}</span>
                                            {model[block][field]}
                                        </li>
                                    )
                                })}
                            </div>
                        </section>
                    </div>
                )
            })}
            
            <input type="radio" name="accordion" id="acc-close" />
            </nav>
        </div>
    )
}

export { GView };