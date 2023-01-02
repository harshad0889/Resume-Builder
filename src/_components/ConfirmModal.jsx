import React from 'react'


export class ConfirmModal extends React.Component {
  // state = {
  //   open: true
  // }
  constructor(props) {
    super(props);
   // self = this;
}

 clickHandler(data) {
        if (typeof this.props.callbackModal === 'function') {

            this.props.callbackModal(data);
        }


    }



  render(){

    //let close = () => this.setState({ open: false });


    return (


  <div className="modal " style={{ display: 'block', background: ' rgba(133, 187, 255, 0.5)'}}>
    <div className="modal-dialog">


      <div className="modal-content">
        <div className="modal-header">
          <button onClick={this.clickHandler.bind(this)} type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">{this.props.title}</h4>
        </div>
        <div className="modal-body">
          <p>
            {this.props.message}  {this.props.body}
          </p>
        </div>
        <div className="modal-footer">
        <br/>
           <button onClick={() => this.clickHandler(true)} type="button" className="close" data-dismiss="modal">Ok</button>
           <button onClick={() => this.clickHandler(false)} type="button" className="close" data-dismiss="modal">Cancel</button>

        </div>
      </div>

    </div>
  </div>


    )
  }
}
