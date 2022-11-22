import {Entity, model, property} from '@loopback/repository';

@model()
export class Facturacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  NotasCredito?: string;

  @property({
    type: 'string',
  })
  NotasDebito?: string;

  @property({
    type: 'string',
  })
  Cuotas_extras?: string;

  @property({
    type: 'number',
  })
  saldo_pendiente?: number;

  @property({
    type: 'string',
  })
  conjuntoId?: string;

  constructor(data?: Partial<Facturacion>) {
    super(data);
  }
}

export interface FacturacionRelations {
  // describe navigational properties here
}

export type FacturacionWithRelations = Facturacion & FacturacionRelations;
