export function authHeaderMulti() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    if (user && user.token) {
       
        return { 'x-access-token':  user.token };
    } else {
        return {};
    }
}