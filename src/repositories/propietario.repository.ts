import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Inmueble, Conjunto} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {ConjuntoRepository} from './conjunto.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Propietario.prototype.id>;

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>,
  ) {
    super(Propietario, dataSource);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
