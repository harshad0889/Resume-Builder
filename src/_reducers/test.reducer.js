import { miscConstants } from '../_constants';

export function test(state = {}, action) {
  switch (action.type) {
    case "test":
      return {
        results:action.results
      };
   
    default:
      return state
  }
}