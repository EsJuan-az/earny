const {VITE_SERVICE_URL} = import.meta.env;
class RecordService{
    static getAll(token){
        return fetch(VITE_SERVICE_URL + `/record`, {
            method: 'GET', 
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
}
export default RecordService;