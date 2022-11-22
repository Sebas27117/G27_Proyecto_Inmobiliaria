import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Imagen, Propietario, Torre} from '../models';
import {ImagenRepository} from './imagen.repository';
import {PropietarioRepository} from './propietario.repository';
import {TorreRepository} from './torre.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly imagenes: HasManyRepositoryFactory<Imagen, typeof Inmueble.prototype.id>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof Inmueble.prototype.id>;

  public readonly torre: BelongsToAccessor<Torre, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>,
  ) {
    super(Inmueble, dataSource);
    this.torre = this.createBelongsToAccessorFor('torre', torreRepositoryGetter,);
    this.registerInclusionResolver('torre', this.torre.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.imagenes = this.createHasManyRepositoryFactoryFor('imagenes', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagenes', this.imagenes.inclusionResolver);
  }
}
