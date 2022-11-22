import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Conjunto, ConjuntoRelations, Propietario, Facturacion, Torre, Usuario} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {FacturacionRepository} from './facturacion.repository';
import {TorreRepository} from './torre.repository';
import {UsuarioRepository} from './usuario.repository';

export class ConjuntoRepository extends DefaultCrudRepository<
  Conjunto,
  typeof Conjunto.prototype.id,
  ConjuntoRelations
> {

  public readonly propietarios: HasManyRepositoryFactory<Propietario, typeof Conjunto.prototype.id>;

  public readonly facturaciones: HasManyRepositoryFactory<Facturacion, typeof Conjunto.prototype.id>;

  public readonly torres: HasManyRepositoryFactory<Torre, typeof Conjunto.prototype.id>;

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Conjunto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('FacturacionRepository') protected facturacionRepositoryGetter: Getter<FacturacionRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Conjunto, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
    this.torres = this.createHasManyRepositoryFactoryFor('torres', torreRepositoryGetter,);
    this.registerInclusionResolver('torres', this.torres.inclusionResolver);
    this.facturaciones = this.createHasManyRepositoryFactoryFor('facturaciones', facturacionRepositoryGetter,);
    this.registerInclusionResolver('facturaciones', this.facturaciones.inclusionResolver);
    this.propietarios = this.createHasManyRepositoryFactoryFor('propietarios', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietarios', this.propietarios.inclusionResolver);
  }
}
