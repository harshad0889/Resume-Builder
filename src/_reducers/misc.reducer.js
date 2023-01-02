import { miscConstants } from '../_constants';

export function misc(state = { requestStatus: 0, data: {}, isMenuOpen: false }, action) {
    switch (action.type) {
        case miscConstants.REQUEST:
            return { ...state, requestStatus: miscConstants.REQUEST, data: action.data };
        case miscConstants.SUCCESS:
            return { ...state, requestStatus: miscConstants.SUCCESS, data: action.data };
        case miscConstants.FAILURE:
            return { ...state, requestStatus: miscConstants.FAILURE, data: action.error };
        case miscConstants.CLEAR:
            return { ...state, requestStatus: miscConstants.CLEAR };
        case "isMenuOpen":
            return { ...state, isMenuOpen: action.data };

        default:
            return state;
    }
}