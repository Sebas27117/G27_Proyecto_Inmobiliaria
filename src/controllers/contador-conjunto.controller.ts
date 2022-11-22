import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Contador,
  Conjunto,
} from '../models';
import {ContadorRepository} from '../repositories';

export class ContadorConjuntoController {
  constructor(
    @repository(ContadorRepository)
    public contadorRepository: ContadorRepository,
  ) { }

  @get('/contadors/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Conjunto belonging to Contador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async getConjunto(
    @param.path.string('id') id: typeof Contador.prototype.id,
  ): Promise<Conjunto> {
    return this.contadorRepository.conjunto(id);
  }
}
