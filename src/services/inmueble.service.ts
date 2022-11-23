import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Inmueble} from '../models/inmueble.model';
import {InmuebleRepository} from '../repositories/inmueble.repository';


@injectable({scope: BindingScope.TRANSIENT})
export class InmuebleService {
  constructor(
    //Ingresar a la base de datos
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository
  ) { }
  //Inmuebles disponibles
  getInmueblesDisponibles(): Promise<Inmueble[]> {
    //lista de inmuebles según filtro
    let inmueblesDisponibles = this.inmuebleRepository.find({
      where: {
        Estado: "Disp"
      }
    });

    return inmueblesDisponibles;

  }
  //Inmubles disponibles según precio
  getInmueblesPorPrecio(precio: number): Promise<Inmueble[]> {
    let inmueblesDisponibles = this.inmuebleRepository.find({
      where: {
        Precio: precio,
        Estado: "Disp"
      }
    });

    return inmueblesDisponibles;
  }

  //Inmuebles disponibles con precio mayor a
  getInmueblesPrecioMayorA(precio: number): Promise<Inmueble[]> {
    let inmueblesDisponibles = this.inmuebleRepository.find({
      include: ['propietario', 'torre'],
      where: {
        Precio: {gt: precio},
        Estado: "Disp"
      }
    });

    return inmueblesDisponibles;
  }
}
