import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { LoadingImg, ApiKeyModal } from '../_components';

import { reducerConstants } from '../_constants';

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilter: false,
      query: {
        pageVo: {
          pageNo: 1,
          noOfItems: 8
        }
      }
    };
    this.getAllCompany = this.getAllCompany.bind(this);

    if (localStorage.getItem('selectedcompany')) {
      let company = JSON.parse(localStorage.getItem('selectedcompany'));
      this.state.query.companyid = company._id;
    }
  }
  selectList(data) {
    if (typeof this.props.selectList === 'function') {
      localStorage.setItem('selectedcompany', JSON.stringify(data));
      this.props.selectList(data);
    }
  }

  componentWillMount() {
    this.setState({ height: window.innerHeight + 'px' });
    this.getAllCompany(1);
  }
  render() {
    const paginationItems = [];
    const companyRows = [];

    return (
      <div className="Api">
        <div className="col-md-12">
          <div className="card regular-table-with-color">
            <div className="card-header page-header ">
              <div className="row">
                <div className="col-md-8">
                  <h4> Api</h4>
                </div>
                <div className="col-md-4">

                </div>
              </div>
            </div>
            <div className="card-body  table-responsive main-card-body ">

              <div className="row">
                <div className="col-md-4">
                  <label>
                    Api key :
    
                  </label>

                </div>
                <div className="col-md-4">

                  <input value="*******************************" className="form-control apikeyinput" type="password" disabled />

                </div>
                <div className="col-md-4">
                  <ApiKeyModal companyid={this.state.query.companyid} />
                </div>


              </div>



              <br />
              {/*  <div className="row">
   <div className="col-md-12">
  <h4> Documents</h4>
  </div>
    </div>*/}




            </div>

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { results } = state.test

  const { requestStatus, companyData } = state.company;
  return {
    requestStatus,
    companyData
  };
}

const connectedApi = connect(mapStateToProps)(Api);
export { connectedApi as Api };
