
import { modalConstants } from '../_constants';


export const modalActions = {
    open,
    clear
};

function open(code,data) {
    return { type: modalConstants.OPEN, modalcode:code,data };
}


function clear(data) {
    return { type: modalConstants.CLEAR,data };
}
