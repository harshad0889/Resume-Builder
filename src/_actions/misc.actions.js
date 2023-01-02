import { miscConstants, reducerConstants } from '../_constants';
import { miscService } from '../_services';
import { alertActions } from './';



export const miscActions = {
    countries,
    shorturl,
    fileupload,
    otpverification,
    fileuploadContact,
    texttovoice,
    voiceoptionlist,
    getdashbaorddata,
    getCompanyApiKey,
    uploadexcel,
    getAllActiveCountry,
    downloadinvoice
};


function uploadexcel(file,name) {
    return dispatch =>
        new Promise((resolve, reject) => {
            console.log(file,name);
            dispatch({
                        type: miscConstants.FILE_REQUEST,
                        data:{}
                    });
           miscService.uploadexcel(file,name).then(
                data => {
                    console.log(data);
                    if (data.error_code === 0) {
                         dispatch({
                        type: miscConstants.FILE_SUCCESS,
                        data:data.message.toString()
                    });
                        resolve(data.data);
                     dispatch(alertActions.success(data.message.toString()));
                    } else {
                        reject(data.data);

                        dispatch(alertActions.error(data.message.toString()));
                         dispatch({
                        type: miscConstants.FILE_FAILURE,
                        data:{}
                    });
                    }
                },
                error => {

                    reject(error);
                    dispatch(alertActions.error(error.toString()));
                     dispatch({
                        type: miscConstants.FILE_FAILURE,
                        data:{}
                    });
                }
            );
        });
}


function  getAllActiveCountry( countryObj) {

    return dispatch =>
        new Promise((resolve, reject) => {
        dispatch(request({}));


        miscService.getAllActiveCountry({})
            .then(
                data => {
                     resolve(data.data);
                  //  dispatch(success(data));
                  console.log(data);

                    dispatch({
                        type: reducerConstants.COUNTRYLIST_SUCCESS,
                        data
                    });
                    // history.push('/');
                },
                error => {
                    reject(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    })
}
function downloadinvoice(data){
        return dispatch =>
        new Promise((resolve, reject) => {
            dispatch({
                type: reducerConstants.TARIFFLIST_REQUEST,
                data
            });

            miscService.downloadinvoice(data).then(
                data => {
                    dispatch({
                        type: reducerConstants.TARIFFLIST_SUCCESS,
                        data
                    });
                    resolve(data);
                },
                error => {
                    dispatch({
                        type: reducerConstants.TARIFFLIST_FAILURE,
                        error
                    });
                    reject(error);
                    dispatch(alertActions.error(error.toString()));
                }
            );
        });
}
function fileupload(file,name) {
    return dispatch =>
        new Promise((resolve, reject) => {
            console.log(file,name);
            dispatch({
                        type: miscConstants.FILE_REQUEST,
                        data:{}
                    });
           miscService.fileupload(file,name).then(
                data => {
                    console.log(data);
                    if (data.error_code === 0) {
                         dispatch({
                        type: miscConstants.FILE_SUCCESS,
                        data:data.message.toString()
                    });
                        resolve(data.data);
                     dispatch(alertActions.success(data.message.toString()));
                    } else {
                        reject(data.data);

                        dispatch(alertActions.error(data.message.toString()));
                         dispatch({
                        type: miscConstants.FILE_FAILURE,
                        data:{}
                    });
                    }
                },
                error => {

                    reject(error);
                    dispatch(alertActions.error(error.toString()));
                     dispatch({
                        type: miscConstants.FILE_FAILURE,
                        data:{}
                    });
                }
            );
        });
}

function fileuploadContact(file,name) {
    return dispatch =>
        new Promise((resolve, reject) => {
            console.log(file,name);
             dispatch({
                        type: miscConstants.FILE_REQUEST,
                        data:{}
                    });


           miscService.fileuploadContact(file,name).then(
                data => {
                    console.log(data);
                    if (data.error_code === 0) {
                         dispatch({
                        type: miscConstants.FILE_SUCCESS,
                        data:data.message.toString()
                    });
                        resolve(data.data);
                     dispatch(alertActions.success(data.message.toString()));
                    } else {
                        reject(data.data);
                        dispatch({
                        type: miscConstants.FILE_FAILURE,
                        data:{}
                    });

                        dispatch(alertActions.error(data.message.toString()));
                    }
                },
                error => {

                    reject(error);
                    dispatch({
                        type: miscConstants.FILE_FAILURE,
                        data:{}
                    });
                    dispatch(alertActions.error(error.toString()));
                }
            );
        });
}



function texttovoice(dataObj) {
    return dispatch =>
        new Promise((resolve, reject) => {

             dispatch({
                        type: miscConstants.FILE_REQUEST,
                        data:{}
                    });


           miscService.texttovoice(dataObj).then(
                data => {
                    console.log(data);
                    if (data.error_code === 0) {
                         dispatch({
                        type: miscConstants.FILE_SUCCESS,
                        data:data.message.toString()
                    });
                        resolve(data.data);
                        if(!dataObj.noAlert){
                     dispatch(alertActions.success(data.message.toString()));
                 }
                    } else {
                        reject(data.data);
                        dispatch({
                        type: miscConstants.FILE_FAILURE,
                        data:{}
                    });

                        dispatch(alertActions.error(data.message.toString()));
                    }
                },
                error => {

                    reject(error);
                    dispatch({
                        type: miscConstants.FILE_FAILURE,
                        data:{}
                    });
                    dispatch(alertActions.error(error.toString()));
                }
            );
        });
}

function getdashbaorddata(dataObject) {


    return dispatch =>
        new Promise((resolve, reject) => {
        dispatch(request({}));


        miscService.getdashbaorddata(dataObject)
            .then(
                data => {
                     resolve(data.data);
                  //  dispatch(success(data));
                  console.log(data);


                    // history.push('/');
                },
                error => {
                    reject(error);

                }
            );
    })

}

//voiceoptionlist

function voiceoptionlist() {


    return dispatch =>
        new Promise((resolve, reject) => {
        dispatch(request({}));


        miscService.voiceoptionlist()
            .then(
                data => {
                     resolve(data.data);
                  //  dispatch(success(data));
                  console.log(data);


                    // history.push('/');
                },
                error => {
                    reject(error);

                }
            );
    })

}

function countries() {

    return dispatch =>
        new Promise((resolve, reject) => {
        dispatch(request({}));


        miscService.countries({})
            .then(
                data => {
                     resolve(data.data);
                  //  dispatch(success(data));
                  console.log(data);

                    dispatch({
                        type: reducerConstants.COUNTRYLIST_SUCCESS,
                        data
                    });
                    // history.push('/');
                },
                error => {
                    reject(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    })

}



function shorturl(stringURL) {
    return dispatch => {
        dispatch(request({}));

        miscService.shorturl(stringURL)
            .then(
                res => {
                    console.log(res);
                    dispatch(success({}));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

}


function otpverification(obj) {
      return dispatch =>
        new Promise((resolve, reject) => {
        dispatch(request({}));


        miscService.otpverification(obj)
            .then(
                data => {
             if (data.error_code === 0) {
                        resolve(data.data);
                        dispatch(alertActions.success(data.message.toString()));
                    } else {
                        reject(data.data);

                        dispatch(alertActions.error(data.message.toString()));
                    }


                    // history.push('/');
                },
                error => {
                        dispatch(alertActions.error(error.toString()));

                    reject(error);
                    dispatch(failure(error.toString()));

                }
            );
    })

}
function getCompanyApiKey(dataObject) {


    return new Promise((resolve, reject) => {



        miscService.getCompanyApiKey(dataObject)
            .then(
                data => {
                     resolve(data.data);
                  //  dispatch(success(data));
                  console.log(data);


                    // history.push('/');
                },
                error => {
                    reject(error);

                }
            );
    })

}





function request(data) { return { type: miscConstants.REQUEST, data } }

function success(data) { return { type: miscConstants.SUCCESS, data } }

function failure(error) { return { type: miscConstants.FAILURE, error } }