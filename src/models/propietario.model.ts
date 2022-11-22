import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Conjunto} from './conjunto.model';

@model()
export class Propietario extends Entity {
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
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  N_Doc: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Clave: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @hasMany(() => Inmueble)
  inmuebles: Inmueble[];

  @belongsTo(() => Conjunto)
  conjuntoId: string;

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
