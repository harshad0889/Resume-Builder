import { modalConstants } from '../_constants';
 
export function modal(state = {modalcode:0,modal_result:{}}, action) {
  console.log("=============================",action);
  switch (action.type) {
    case modalConstants.OPEN:

      return {
        ...state,
        type: 'modal-open',
        modalcode: action.modalcode,
        modal_result:action.data

      };
   
    case modalConstants.CLEAR:
      return {
        ...state,
        type: 'modal-clear',
        modalcode: 0,
        modal_result:action.data
      };
    default:
      return state
  }
}