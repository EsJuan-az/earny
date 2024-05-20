const {VITE_SERVICE_URL} = import.meta.env;
class OrderService{
    static createOrder(token, body){
        return fetch(VITE_SERVICE_URL + '/order/', {
            method: 'POST', 
            body: JSON.stringify(body),
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static addProduct(token, body){
        return fetch(VITE_SERVICE_URL + '/order/product/', {
            method: 'POST', 
            body: JSON.stringify(body),
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static getOrder(token, id){
        return fetch(VITE_SERVICE_URL + '/order/' + id, {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static getOrders(token){
        return fetch(VITE_SERVICE_URL + '/order/', {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static getMapById(token, id, pos){
        return fetch(VITE_SERVICE_URL + '/order/map/' + id, {
            method: 'POST', 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pos),
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static getMap(token, pos){
        return fetch(VITE_SERVICE_URL + '/order/map/', {
            method: 'POST', 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pos),
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static getByBusiness(token, id){
        return fetch(VITE_SERVICE_URL + '/order/business/' + id, {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
    static getAllOrders(token){
        return fetch(VITE_SERVICE_URL + '/order/business/', {
            method: 'GET', 
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
        }).then(resp => {
            if( resp ) return resp.json();
        });
    }
}
export default OrderService;