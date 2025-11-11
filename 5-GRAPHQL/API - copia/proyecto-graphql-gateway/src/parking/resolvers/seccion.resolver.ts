import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { SeccionService } from '../services/seccion.service';
import { Seccion } from '../entities/seccion.entity';
import { CreateSeccionInput } from '../dto/create-seccion.input';
import { UpdateSeccionInput } from '../dto/update-seccion.input';

@Resolver(() => Seccion)
export class SeccionResolver {
  constructor(private readonly seccionService: SeccionService) {}

  @Mutation(() => Seccion)
  createSeccion(
    @Args('createSeccionInput') createSeccionInput: CreateSeccionInput,
  ): Promise<Seccion> {
    return this.seccionService.create(createSeccionInput);
  }

  @Query(() => [Seccion], { name: 'secciones' })
  findAll(): Promise<Seccion[]> {
    return this.seccionService.findAll();
  }

  @Query(() => Seccion, { name: 'seccion' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Seccion> {
    return this.seccionService.findOne(id);
  }

  @Mutation(() => Seccion)
  updateSeccion(
    @Args('updateSeccionInput') updateSeccionInput: UpdateSeccionInput,
  ): Promise<Seccion> {
    return this.seccionService.update(updateSeccionInput.id, updateSeccionInput);
  }

  @Mutation(() => Seccion)
  removeSeccion(@Args('id', { type: () => ID }) id: string): Promise<Seccion> {
    return this.seccionService.remove(id);
  }
}
