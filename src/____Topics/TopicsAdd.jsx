import React from 'react';
import { Link } from 'react-router-dom';
  
import { connect } from 'react-redux';

// import {testActions}  from '../_actions';

class TopicsAdd extends React.Component {



    constructor(props) {
        super(props);
        console.log(this.props.match.params.id);

        if (this.props.match.params.id && this.props.match.params.id > 0){
            alert(this.props.match.params.id);
        }
            this.state = {
                openFilter: false
            }
    }

    render() {
        console.log(this.props);
        return (
            <div className="TopicsAdd">
    <div className="col-md-8 col-md-offset-2">
        <div className="card">
            <div className="card-header page-header ">
                <div className="card-header page-header">
                   <div className="page-titile-content" > <h4 className="card-title">TopicsAdd</h4>
                </div>
            </div> 

            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 pr-1">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" placeholder="Text" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 pr-1">
                        <div className="form-group">
                            <label>Select</label>
                            <select className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>2</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 pr-1">
                        <div className="form-group">
                            <button className="btn btn-success btn-wd"> Submite </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="card-footer">
        </div>
    </div>
</div></div>



        );
    }
}

function mapStateToProps(state) {
    return {
        state: state.test
    };
}
const connectedTopicsAdd = connect(mapStateToProps)(TopicsAdd);
export { connectedTopicsAdd as TopicsAdd };