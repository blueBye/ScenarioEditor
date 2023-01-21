import './GView.css'
import * as React from 'react';
import {useEffect, useState} from 'react';
import { subject, mouseSubject, revealSubject } from '../../service.js'


const GView = () => {
    const [model, setModel] = useState({});
    const [selected, setSelected] = useState("");

    subject.subscribe(res=>{
        setModel(res)
    })

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

    const selectBox = (target) => {
        revealSubject.next(model[target]['_line_start'])
        setSelected(target)
    }

    return (
        <div id="view" className='view'>
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