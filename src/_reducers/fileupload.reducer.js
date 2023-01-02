import { miscConstants } from '../_constants';

export function fileupload(state = { fileuploadStatus: 0, data: {} }, action) {
    switch (action.type) {
        case miscConstants.FILE_REQUEST:
            return { fileuploadStatus: miscConstants.FILE_REQUEST, data: action.data };
        case miscConstants.FILE_SUCCESS:
            return { fileuploadStatus: miscConstants.FILE_SUCCESS, data: action.data };
        case miscConstants.FILE_FAILURE:
            return { fileuploadStatus: miscConstants.FILE_FAILURE, data: action.error };
        case miscConstants.FILE_CLEAR:
            return { fileuploadStatus: miscConstants.FILE_CLEAR };
        default:
            return state;
    }
}   