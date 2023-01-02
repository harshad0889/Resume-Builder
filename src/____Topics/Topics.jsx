import React from 'react';
import { Link } from 'react-router-dom';
  
import { connect } from 'react-redux';
// import {testActions}  from '../_actions';

class Topics extends React.Component {

     constructor(props) {
        super(props);
        this.state = {
            openFilter: false
            
        }


    }

    render() {
        return (
            <div className="Topics">
    <div className="col-md-12">
        <div className="card regular-table-with-color">
            <div className="card-header page-header ">
               <div className="page-titile-content" > <h4 className="card-title">Topics</h4>
                <p className="card-category">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore </p>
                <p>
                    <Link className='btn nav-link' to='/schedulecalladd/0'>
                                       <i className='pe-7s-speaker'></i>
                                      <span>Add  Scedule</span>
                                      </Link>
                </p> </div>
                <p> 
                    <button className="btn  filterbtn float-right" onClick={() => this.setState( { openFilter: !this.state.openFilter }) }>
                        <i className="fa fa-filter"></i> Filter</button>
                </p>
                {this.state.openFilter &&
                <div className="filterlist">
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>From</label>
                                <input type="Date" placeholder="Enter email" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>To</label>
                                <input type="Date" placeholder="Enter email" className="form-control" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label>Topics</label>
                                <select className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                }
            </div>
            <div className="card-body  table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>CallID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Country</th>
                            <th>Date/Time</th>
                            <th>Topics</th>
                            <th>Texticall </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td>1</td>
                            <td>Dakota Rice (Success)</td>
                            <td>+1 9633277345</td>
                            <td>Niger</td>
                            <td>22 April/2019 10:30AM</td>
                            <td>BirthDay</td>
                            <td>Sinaai-Waas</td>
                            <td className="text-right">
                                <Link to="#" className="btn btn-link btn-warning edit"><i className="fa fa-edit"></i></Link>
                                <Link to="#" className="btn btn-link btn-danger remove"><i className="fa fa-times"></i></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Minerva Hooper</td>
                            <td>+1 9763277345</td>
                            <td>India</td>
                            <td>22 April/2019 10:30AM</td>
                            <td> Xmas </td>
                            <td>Sinaai-Waas</td>
                            <td className="text-right">
                                <Link to="#" className="btn btn-link btn-warning edit"><i className="fa fa-edit"></i></Link>
                                <Link to="#" className="btn btn-link btn-danger remove"><i className="fa fa-times"></i></Link>
                            </td>
                        </tr>
                        <tr className="">
                            <td>3</td>
                            <td>Sage Rodriguez (Info)</td>
                            <td>+1 9633123123</td>
                            <td>Netherlands</td>
                            <td>22 April/2019 10:30AM</td>
                            <td>BirthDay</td>
                            <td>Baileux</td>
                            <td className="text-right">
                                <Link to="#" className="btn btn-link btn-warning edit"><i className="fa fa-edit"></i></Link>
                                <Link to="#" className="btn btn-link btn-danger remove"><i className="fa fa-times"></i></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Philip Chaney</td>
                            <td>+1 75744574</td>
                            <td>Korea, South</td>
                            <td>22 April/2019 10:30AM</td>
                            <td>BirthDay</td>
                            <td>Overland Park</td>
                            <td className="text-right">
                                <Link to="#" className="btn btn-link btn-warning edit"><i className="fa fa-edit"></i></Link>
                                <Link to="#" className="btn btn-link btn-danger remove"><i className="fa fa-times"></i></Link>
                            </td>
                        </tr>
                        <tr className="">
                            <td>5</td>
                            <td>Doris Greene (Danger)</td>
                            <td>+1 963327765</td>
                            <td>Malawi</td>
                            <td>22 April/2019 10:30AM</td>
                            <td>BirthDay</td>
                            <td>Feldkirchen in Kärnten</td>
                            <td className="text-right">
                                <Link to="#" className="btn btn-link btn-warning edit"><i className="fa fa-edit"></i></Link>
                                <Link to="#" className="btn btn-link btn-danger remove"><i className="fa fa-times"></i></Link>
                            </td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Mason Porter</td>
                            <td>+1 963327787</td>
                            <td>Chile</td>
                            <td>22 April/2019 10:30AM</td>
                            <td>BirthDay</td>
                            <td>Gloucester</td>
                            <td className="text-right">
                                <Link to="#" className="btn btn-link btn-warning edit"><i className="fa fa-edit"></i></Link>
                                <Link to="#" className="btn btn-link btn-danger remove"><i className="fa fa-times"></i></Link>
                            </td>
                        </tr>
                        <tr className="warning">
                            <td>7</td>
                            <td>Mike Chaney (Warning)</td>
                            <td>+1 96334427738</td>
                            <td>Romania</td>
                            <td>22 April/2019 10:30AM</td>
                            <td>BirthDay</td>
                            <td>Bucharest</td>
                            <td className="text-right">
                                <Link to="#" className="btn btn-link btn-warning edit"><i className="fa fa-edit"></i></Link>
                                <Link to="#" className="btn btn-link btn-danger remove"><i className="fa fa-times"></i></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ul className="pagination">
                    <li className="page-item">
                        <Link className="page-link" to="#">«</Link>
                    </li>
                    <li className="page-item">
                        <Link className="page-link" to="#">1</Link>
                    </li>
                    <li className="page-item">
                        <Link className="page-link" to="#">2</Link>
                    </li>
                    <li className="page-item active">
                        <Link className="page-link" to="#">3</Link>
                    </li>
                    <li className="page-item">
                        <Link className="page-link" to="#">4</Link>
                    </li>
                    <li className="page-item">
                        <Link className="page-link" to="#">5</Link>
                    </li>
                    <li className="page-item">
                        <Link className="page-link" to="#">»</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
        );
    }
}

function mapStateToProps(state) {
    // const { results } = state.test

    return {
        state: state.test
    };

}


const connectedTopics = connect(mapStateToProps)(Topics);
export { connectedTopics as Topics };