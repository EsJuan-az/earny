class Validation{
    static validEmail(email){
        // Expresión regular para validar el email
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // Testear la expresión regular contra el email proporcionado
        return regex.test(email);
    }
    static isSecurePassword(password) {
        // Ocho de longitúd.
        const regex = /^.{8,}$/;
        // Testear la expresión regular contra la contraseña proporcionada
        return regex.test(password);
    }
    static validPhoneNumber(phoneNumber) {
        // Expresión regular para validar el número de teléfono
        const regex = /^\+?[1-9]{2}\d{1,14}$/;
      
        // Testear la expresión regular contra el número de teléfono proporcionado
        return regex.test(phoneNumber);
    }
    static validRealName(name) {
        // Expresión regular para validar nombres reales
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
        // Testear la expresión regular contra el nombre proporcionado
        return regex.test(name);
    }
    static validUsername(username) {
        // Expresión regular para validar el nombre de usuario
        const regex = /^[A-Za-z0-9](?:[A-Za-z0-9._]{0,18}[A-Za-z0-9])?$/;
      
        // Testear la expresión regular contra el nombre de usuario proporcionado
        return regex.test(username);
    }
    static validBusinessname(username) {
        // Expresión regular para validar el nombre de usuario
        const regex = /^[0-9A-Za-zÀ-ÖØ-öø-ÿ ¡!¿?\-:""%&,]+$/;
    
        // Testear la expresión regular contra el nombre de usuario proporcionado
        return regex.test(username);
    }
}
export default Validation;