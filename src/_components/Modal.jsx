import React from 'react'
import { connect } from 'react-redux';
import { modalActions } from '../_actions';



 class Modal extends React.Component {
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
      <div>
      {this.props.modalcode && this.props.modalcode !==0 &&
  <div className="modal " style={{ display: 'block', background: ' rgba(133, 187, 255, 0.5)'}}>
    <div className="modal-dialog">
    
     
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">{this.props.title}</h4>
        </div>
        <div className="modal-body">
         
              {this.props.children}
       
        </div>
         
      </div>
      
    </div>
  </div>
}
      </div>

    )
  }
}


function mapStateToProps(state) {
    const { modalcode } = state.modal;
    console.log(state);
   
  
    return {
        modalcode
    };
}

const connectedModal = connect(mapStateToProps)(Modal);
export { connectedModal as Modal };