import React from 'react'
export class LoadingImg extends React.Component {
    constructor(props) { 
        super(props);
    }
    

    render() {

        return ( 

            <div className="loadingimg">
              <img src="/dist/assets/img/load-g.gif"/> 
           </div>

        )
    }
}