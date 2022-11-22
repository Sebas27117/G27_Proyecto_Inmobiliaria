import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Torre, Imagen, Propietario} from '../models';
import {TorreRepository} from './torre.repository';
import {ImagenRepository} from './imagen.repository';
import {PropietarioRepository} from './propietario.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly torre: BelongsToAccessor<Torre, typeof Inmueble.prototype.id>;

  public readonly imagenes: HasManyRepositoryFactory<Imagen, typeof Inmueble.prototype.id>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(Inmueble, dataSource);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
    this.torre = this.createBelongsToAccessorFor('torre', torreRepositoryGetter,);
    this.registerInclusionResolver('torre', this.torre.inclusionResolver);
  }
}
