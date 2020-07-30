import React, { Component } from 'react';


export class About extends Component {

    render() {
        return (
            <div className="c-container-content">
                <div className="c-container_about" style={{textAlign: 'center', fontFamily:'Lora, sans-serif', fontWeight: '300'}}>
                    <h1>This is a small blog built on the MERN stack</h1>
                    <h2>Coded by Dominik Kardaš</h2>
                    <h3><a href="https://github.com/dominikardas/mern-blog" style={{color: '#3CC'}}>Visit this project here</a></h3>
                </div>
            </div>
        )
    }
}

export default About;