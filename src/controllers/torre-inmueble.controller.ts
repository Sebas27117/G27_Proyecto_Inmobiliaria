import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Torre,
  Inmueble,
} from '../models';
import {TorreRepository} from '../repositories';

export class TorreInmuebleController {
  constructor(
    @repository(TorreRepository) protected torreRepository: TorreRepository,
  ) { }

  @get('/torres/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Torre has many Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.torreRepository.inmuebles(id).find(filter);
  }

  @post('/torres/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Torre model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Torre.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInTorre',
            exclude: ['id'],
            optional: ['torreId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.torreRepository.inmuebles(id).create(inmueble);
  }

  @patch('/torres/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Torre.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.torreRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/torres/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Torre.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.torreRepository.inmuebles(id).delete(where);
  }
}
