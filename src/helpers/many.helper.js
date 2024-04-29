class ManyHelper{
    static capitalize(string) {
        if (string.length === 0) return string; // Retorna el string original si está vacío
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
      }
}
export default ManyHelper;