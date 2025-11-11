import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PagoService } from '../services/pago.service';
import { Pago } from '../entities/pago.entity';
import { CreatePagoInput } from '../dto/create-pago.input';
import { UpdatePagoInput } from '../dto/update-pago.input';

@Resolver(() => Pago)
export class PagoResolver {
  constructor(private readonly pagoService: PagoService) {}

  @Mutation(() => Pago)
  createPago(
    @Args('createPagoInput') createPagoInput: CreatePagoInput,
  ): Promise<Pago> {
    return this.pagoService.create(createPagoInput);
  }

  @Query(() => [Pago], { name: 'pagos' })
  findAll(): Promise<Pago[]> {
    return this.pagoService.findAll();
  }

  @Query(() => Pago, { name: 'pago' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<Pago> {
    return this.pagoService.findOne(id);
  }

  @Mutation(() => Pago)
  updatePago(
    @Args('updatePagoInput') updatePagoInput: UpdatePagoInput,
  ): Promise<Pago> {
    return this.pagoService.update(updatePagoInput.id, updatePagoInput);
  }

  @Mutation(() => Pago)
  removePago(@Args('id', { type: () => ID }) id: string): Promise<Pago> {
    return this.pagoService.remove(id);
  }
}
