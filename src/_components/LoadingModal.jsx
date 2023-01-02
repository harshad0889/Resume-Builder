import React from 'react';
import { Link } from 'react-router-dom';
  
import {LoadingImg} from './LoadingImg';
export class LoadingModal extends React.Component {
    constructor(props) { 
        super(props);
    }
    

    render() {

        return (<div className="LoadingModal">
            <div className="loadingModalInner">
                  <LoadingImg/>
                  </div>
               </div>)
    }
}