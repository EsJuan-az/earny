const {VITE_SERVICE_URL} = import.meta.env;
class BusinessService{
    static getTrending(page){
        const offset = page - 1;
        return fetch(VITE_SERVICE_URL + `/business?offset=${offset}`, {
            method: 'GET', 
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
            return null;
        });
    }
}
export default BusinessService;