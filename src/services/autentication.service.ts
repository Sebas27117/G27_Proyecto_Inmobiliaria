import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../config/llaves';
import {Propietario} from '../models';
import {PropietarioRepository} from '../repositories/propietario.repository';

const jwt = require('jsonwebtoken')
const cryptoJS = require('crypto-js');
const pass_gen = require('password-generator');


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticationService {
  constructor(
    @repository(PropietarioRepository)
    public PropietarioRepository: PropietarioRepository,
  ) { }

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

  validarAcceso(usuario: string, contrasenia: string): any {
    try {
      let prop = this.PropietarioRepository.findOne({
        where: {
          Correo: usuario,
          Clave: contrasenia
        }
      });
      if (prop)
        return prop;

      return false;
    } catch (error) {
      return false;
    }

  }

  //const cifrarClave2=(clave: string) => cryptoJS.MD5(clave).toString();

  //Metodo que genere TOKEN JWT
  generatorTokenJWT(propietario: Propietario) {
    let token = jwt.sign({
      data: {
        id: propietario.id,
        correo: propietario.Correo,
        nombre: `${propietario.Nombres} ${propietario.Apellidos}`
      }
    },
      llaves.claveJWT
    );

    return token;
  }

  validarToken(token: string) {
    try {
      let data = jwt.verify(token, llaves.claveJWT);
      return data;
    } catch (error) {
      return false;
    }
  }

}
