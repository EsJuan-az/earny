const {VITE_SERVICE_URL} = import.meta.env;
class ProductService{
    static addProduct(data, token){
        return fetch(VITE_SERVICE_URL + "/product", {
            method: 'POST', 
            body: JSON.stringify(data),
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static deleteProduct(id, token){
        return fetch(VITE_SERVICE_URL + "/product/" + id, {
            method: 'DELETE',
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static getByBusiness(id){
        return fetch(VITE_SERVICE_URL + '/product/business/' + id, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static getById(id){
        return fetch(VITE_SERVICE_URL + '/product/' + id, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static getAll(){
        return fetch(VITE_SERVICE_URL + '/product/', {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
}
export default ProductService;