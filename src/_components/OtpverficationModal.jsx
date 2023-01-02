import React from 'react'
import { miscActions } from '../_actions';
import { connect } from 'react-redux';


 class OtpverficationModal extends React.Component {
    state = {
        open: true,
        query: {
            phone: this.props.phone,
            number_id: this.props._id,
            code: ''
        }
    }
    constructor(props) {
        super(props);
        // self = this;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        const { query } = this.state;
        this.setState({
            query: {
                ...query,
                [name]: value
            }
        });
    }

    handleSubmit() {
      
        this.setState({ submitted: true });
        const { query } = this.state;
        const { dispatch } = this.props;
        console.log(query);

        if (query.code) {
            let objCopy = Object.assign({}, query);

            dispatch(miscActions.otpverification(objCopy))
            .then(function(){

            },function(){

            });
        }else{
            alert('Enter valied otp');
        }
    }

    clickHandler(data) {
        console.log(data);
        if (typeof this.props.callbackModal === 'function') {

            this.props.callbackModal(data);
        }
    }





    render() {

        //let close = () => this.setState({ open: false });


        return (

            <div className="modal " style={{ display: 'block', background: ' rgba(133, 187, 255, 0.5)'}}>
    <div className="modal-dialog">
    
     
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={this.clickHandler.bind(this)} type="button" className="close" data-dismiss="modal">&times;</button>
          <h4 className="modal-title">otp verfication</h4>
        </div>
        <div className="modal-body">
          <p>
          <div className="row">
          <div className="col-md-4">
           <input type="text" className="form-control" name="code" onChange={this.handleChange} value={this.state.query.code} /> 
          </div>
          </div>
          </p>
        </div>
        <div className="modal-footer">
        <br/>
           <button onClick={() => this.handleSubmit()} type="button" className="btn " data-dismiss="modal">Send</button>
         {/*  <button onClick={() => this.clickHandler(false)} type="button" className="close" data-dismiss="modal">Cancel</button>
       */}    
        </div>
      </div>
      
    </div>
  </div>

        )
    }
}


function mapStateToProps(state) {
  // const { results } = state.test

  const { requestStatus } = state.mynumber;
  return {
    requestStatus
  };
}

const connectedOtpverficationModal = connect(mapStateToProps)(OtpverficationModal);
export { connectedOtpverficationModal as OtpverficationModal };