import { /* inject, */ BindingScope, injectable} from '@loopback/core';

const cryptoJS = require('crypto-js');
const pass_gen = require('password-generator');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticationService {
  constructor(/* Add @inject to inject parameters */) { }

  //Encriptar clave
  cifrarClave(clave: string): string {
    let encryp_pass = cryptoJS.MD5(clave).toString();

    return encryp_pass;
  }

  //Generar clave
  generarClave() {
    let clave = pass_gen(8, false);

    return this.cifrarClave(clave);
  }

  //const cifrarClave2=(clave: string) => cryptoJS.MD5(clave).toString();

}
