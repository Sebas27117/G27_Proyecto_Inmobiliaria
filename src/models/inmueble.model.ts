import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Imagen} from './imagen.model';
import {Propietario} from './propietario.model';
import {Torre} from './torre.model';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Numero: string;

  @hasMany(() => Imagen)
  imagenes: Imagen[];

  @belongsTo(() => Propietario)
  propietarioId: string;

  @belongsTo(() => Torre)
  torreId: string;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
