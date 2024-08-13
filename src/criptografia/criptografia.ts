const masterKey = '#-6!HY]sK!AHDqg1';
const RESTCHAVE_REQUEST = '$4060_REST@Evol#Sistema'
import * as CryptoJS from 'crypto-js';

 const getSHA = (input: string): string => {
  const hash1 = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex).slice(0, 64);
  const hash2 = CryptoJS.SHA256(hash1).toString(CryptoJS.enc.Hex);
  const hash3 = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);

  return hash2 + hash3;
}

const getKey = async (masterKey:string) => {
    let result = Array.from({ length: 256 }, (_, i) => i);
    let k = new Array(256).fill(0);

    for (let i = 0; i < k.length; i++) {
      k[i] =
        masterKey.charCodeAt((i * 2) % masterKey.length) +
        masterKey.charCodeAt(((i * 2) + 1) % masterKey.length);
    }

    let x = 0;
    for (let i = 0; i < result.length; i++) {
      x = (x + result[i] + k[i]) % result.length;
      [result[i], result[x]] = [result[x], result[i]]; // Swap elements
    }

    return result;
  };

  //converter número em hexadecimal com dois dígitos
  const intToHex = async (num:number, length:number) => {
    let hex = num.toString(16);
    return hex.padStart(length, '0').toUpperCase();
  };

  //codificação
  const encode = async (pValue:string, masterKey:string) => {
    let result = '';
    let i = 0;
    let x = 0;
    let aux = await getKey(masterKey);

    for (let secao = 0; secao < pValue.length; secao++) {
      let secaoTxt = pValue.charCodeAt(secao);
      i = (i + 1) % aux.length;
      x = (x + aux[i]) % aux.length;
      [aux[i], aux[x]] = [aux[x], aux[i]]; // Swap elements
      let t = (aux[i] + aux[x]) % aux.length;
      result += await intToHex(secaoTxt ^ aux[t], 2);
    }

    return result;
};

export { encode, masterKey, RESTCHAVE_REQUEST, getSHA }