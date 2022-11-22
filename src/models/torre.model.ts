import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Conjunto} from './conjunto.model';
import {Inmueble} from './inmueble.model';

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

  @belongsTo(() => Conjunto)
  conjuntoId: string;

  @hasMany(() => Inmueble)
  inmuebles: Inmueble[];

  constructor(data?: Partial<Torre>) {
    super(data);
  }
}

export interface TorreRelations {
  // describe navigational properties here
}

export type TorreWithRelations = Torre & TorreRelations;
