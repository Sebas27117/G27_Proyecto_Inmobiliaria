import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Conjunto} from './conjunto.model';

@model()
export class Contador extends Entity {
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

  @belongsTo(() => Conjunto)
  conjuntoId: string;

  constructor(data?: Partial<Contador>) {
    super(data);
  }
}

export interface ContadorRelations {
  // describe navigational properties here
}

export type ContadorWithRelations = Contador & ContadorRelations;
