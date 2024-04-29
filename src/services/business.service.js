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
    static getMe(token){
        return fetch(VITE_SERVICE_URL + '/business/me', {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static addBusiness(data, token){
        return fetch(VITE_SERVICE_URL + '/business', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
}
export default BusinessService;