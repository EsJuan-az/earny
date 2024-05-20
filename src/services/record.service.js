const {VITE_SERVICE_URL} = import.meta.env;
class RecordService{
    static getAll(){
        return fetch(VITE_SERVICE_URL + `/record`, {
            method: 'GET', 
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
}
export default RecordService;