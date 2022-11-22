import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Torre, TorreRelations, Conjunto, Inmueble} from '../models';
import {ConjuntoRepository} from './conjunto.repository';
import {InmuebleRepository} from './inmueble.repository';

export class TorreRepository extends DefaultCrudRepository<
  Torre,
  typeof Torre.prototype.id,
  TorreRelations
> {

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof Torre.prototype.id>;

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Torre.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Torre, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
  }
}
