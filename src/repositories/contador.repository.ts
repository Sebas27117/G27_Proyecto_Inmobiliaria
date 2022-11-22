import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Contador, ContadorRelations, Conjunto} from '../models';
import {ConjuntoRepository} from './conjunto.repository';

export class ContadorRepository extends DefaultCrudRepository<
  Contador,
  typeof Contador.prototype.id,
  ContadorRelations
> {

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof Contador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>,
  ) {
    super(Contador, dataSource);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
  }
}
