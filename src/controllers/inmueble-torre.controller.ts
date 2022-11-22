import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Torre,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleTorreController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/torre', {
    responses: {
      '200': {
        description: 'Torre belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Torre)},
          },
        },
      },
    },
  })
  async getTorre(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Torre> {
    return this.inmuebleRepository.torre(id);
  }
}
