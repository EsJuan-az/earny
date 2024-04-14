const {VITE_SERVICE_URL} = import.meta.env;
class UserService{
    static register(data){
        return fetch(VITE_SERVICE_URL + "/user", {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static login(data){
        return fetch(VITE_SERVICE_URL + "/user/auth", {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
}
export default UserService;