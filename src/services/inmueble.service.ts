import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {InmuebleRepository} from '../repositories/inmueble.repository';


@injectable({scope: BindingScope.TRANSIENT})
export class InmuebleService {
  constructor(
    //Ingresar a la base de datos
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository
  ) { }

  getInmueblesDisponibles() {
    InmuebleRepository
  }

}
