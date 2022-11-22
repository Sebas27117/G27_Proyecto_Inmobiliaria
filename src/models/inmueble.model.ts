import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Torre} from './torre.model';
import {Imagen} from './imagen.model';
import {Propietario} from './propietario.model';

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

  @property({
    type: 'number',
    required: true,
  })
  Precio: number;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @belongsTo(() => Torre)
  torreId: string;

  @hasMany(() => Imagen)
  imagenes: Imagen[];

  @belongsTo(() => Propietario)
  propietarioId: string;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
