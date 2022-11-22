import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Conjunto} from './conjunto.model';

@model()
export class Torre extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasMany(() => Inmueble)
  inmuebles_torre: Inmueble[];

  @belongsTo(() => Conjunto)
  conjuntoId: string;

  constructor(data?: Partial<Torre>) {
    super(data);
  }
}

export interface TorreRelations {
  // describe navigational properties here
}

export type TorreWithRelations = Torre & TorreRelations;
