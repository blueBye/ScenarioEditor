import './GView.css'
import * as React from 'react';
import { subject } from '../../service.js'
import {useEffect, useState} from 'react';


const GView = () => {
    const [model, setModel] = useState({});

    subject.subscribe(res=>{
        setModel(res)
    })

    useEffect(() => {
        setModel({temp: ''});
    }, []);

    return (
        <div id="view">
        <nav className="arrows">
        
        {Object.keys(model).map((block, i)=>{
            return (
                <>
                    <input type="radio" name="accordion" id={block} />
                    <section className="box">
        			    <label className="box-title" htmlFor={block} >{model[block]['type']}</label>
            			<label className="box-close" htmlFor="acc-close"></label>
                        <div className="box-content">
                            {Object.keys(model[block]).map((field, j)=> {
                                return (
                                    <li>
                                        <span className="field-name">{field}</span>
                                        {model[block][field]}
                                    </li>
                                )
                            })}
                        </div>
                    </section>
                </>
            )
        })}

        {/* <input type="radio" name="accordion" id="cb1" /> */}
        {/* <section className="box"> */}
			{/* <label className="box-title" htmlFor="cb1">Readme</label> */}
			{/* <label className="box-close" htmlFor="acc-close"></label> */}
			{/* <div className="box-content">Click on an item to open. Click on its header or the list header to close.</div> */}
		{/* </section> */}
        
        <input type="radio" name="accordion" id="acc-close" />
        </nav>
        </div>
    )
}

export { GView };