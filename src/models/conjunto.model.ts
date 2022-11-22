import {Entity, model, property, hasMany} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Facturacion} from './facturacion.model';
import {Torre} from './torre.model';
import {Usuario} from './usuario.model';

@model()
export class Conjunto extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Nit: string;

  @property({
    type: 'string',
    required: true,
  })
  N_Cuenta: string;

  @property({
    type: 'string',
    required: true,
  })
  Banco: string;

  @property({
    type: 'string',
    required: true,
  })
  Admin: string;

  @property({
    type: 'number',
  })
  Interes?: number;

  @property({
    type: 'string',
  })
  Inicio_fact?: string;

  @property({
    type: 'number',
  })
  Presupuesto_actual?: number;

  @hasMany(() => Propietario)
  propietarios: Propietario[];

  @hasMany(() => Facturacion)
  facturaciones: Facturacion[];

  @hasMany(() => Torre)
  torres: Torre[];

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  constructor(data?: Partial<Conjunto>) {
    super(data);
  }
}

export interface ConjuntoRelations {
  // describe navigational properties here
}

export type ConjuntoWithRelations = Conjunto & ConjuntoRelations;
