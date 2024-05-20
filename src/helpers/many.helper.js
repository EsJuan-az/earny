class ManyHelper{
    static capitalize(string) {
        if (string.length === 0) return string; // Retorna el string original si está vacío
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
      }
    static limitText(text, maxChar){
      const words = text.split(' ');
      let letterCount = 0;
      let finalStr = '';
      for( let word of words ){
        letterCount += word.length + 1;
        if(letterCount <= maxChar){
          finalStr = `${finalStr} ${word}`;
        }else{
          break;
        }
      }
      if(finalStr.length < text.length){
        finalStr += (finalStr.endsWith('.') ? '..' : '...');
      }
      return  finalStr;
    }
    static commaSeparate(number){
      const str = number + '';
      let finalStr = '';
      for( let i = str.length - 1; i >= 0; i-- ){
        const index = Math.abs(str.length - 1 - i);
        const digit = str[i];
        finalStr = digit + finalStr;
        if( index % 3 == 2 && index != str.length - 1 ){
          finalStr = '.' + finalStr;
        }
      }
      return finalStr;
    }
}
export default ManyHelper;