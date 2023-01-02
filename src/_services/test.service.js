


  import config from 'config';
import { authHeader } from '../_helpers';

export const testService = {
    test
};
function test(argument) {
	const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        
    };

    return fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => {
    	console.log(json);
    	return json;}
  	)
}
