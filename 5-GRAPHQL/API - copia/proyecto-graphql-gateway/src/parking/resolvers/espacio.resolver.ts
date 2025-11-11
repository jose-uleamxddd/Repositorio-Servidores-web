import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EspacioService } from '../services/espacio.service';
import { Espacio } from '../entities/espacio.entity';
import { CreateEspacioInput } from '../dto/create-espacio.input';
import { UpdateEspacioInput } from '../dto/update-espacio.input';

@Resolver(() => Espacio)
export class EspacioResolver {
  constructor(private readonly espacioService: EspacioService) {}

  @Mutation(() => Espacio)
  createEspacio(
    @Args('createEspacioInput') createEspacioInput: CreateEspacioInput,
  ): Promise<Espacio> {
    return this.espacioService.create(createEspacioInput);
  }

  @Query(() => [Espacio], { name: 'espacios' })
  findAll(): Promise<Espacio[]> {
    return this.espacioService.findAll();
  }

  @Query(() => Espacio, { name: 'espacio' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Espacio> {
    return this.espacioService.findOne(id);
  }

  @Mutation(() => Espacio)
  updateEspacio(
    @Args('updateEspacioInput') updateEspacioInput: UpdateEspacioInput,
  ): Promise<Espacio> {
    return this.espacioService.update(updateEspacioInput.id, updateEspacioInput);
  }

  @Mutation(() => Espacio)
  removeEspacio(@Args('id', { type: () => ID }) id: string): Promise<Espacio> {
    return this.espacioService.remove(id);
  }
}
