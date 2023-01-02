import { miscConstants } from '../_constants';
import { testService } from '../_services';
import { alertActions } from './';


export const testActions = {
    test
};

function test() {
    return dispatch => {
        dispatch(request({}));

        testService.test({})
            .then(
                results => { 
                    dispatch(success(results));
                   // history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(data) { return { type: miscConstants.MISC_REQUEST,data  } }
    function success(results) { return { type:"test", results } }
    function failure(error) { return { type: miscConstants.MISC_FAILURE, error } }
}
