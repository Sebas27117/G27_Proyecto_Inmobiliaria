import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Torre, TorreRelations, Inmueble, Conjunto} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {ConjuntoRepository} from './conjunto.repository';

export class TorreRepository extends DefaultCrudRepository<
  Torre,
  typeof Torre.prototype.id,
  TorreRelations
> {

  public readonly inmuebles_torre: HasManyRepositoryFactory<Inmueble, typeof Torre.prototype.id>;

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof Torre.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>,
  ) {
    super(Torre, dataSource);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
    this.inmuebles_torre = this.createHasManyRepositoryFactoryFor('inmuebles_torre', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles_torre', this.inmuebles_torre.inclusionResolver);
  }
}
