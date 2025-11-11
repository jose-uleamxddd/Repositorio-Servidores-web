import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DetallePagoService } from '../services/detalle-pago.service';
import { DetallePago } from '../entities/detalle-pago.entity';
import { CreateDetallePagoInput } from '../dto/create-detalle-pago.input';
import { UpdateDetallePagoInput } from '../dto/update-detalle-pago.input';

@Resolver(() => DetallePago)
export class DetallePagoResolver {
  constructor(private readonly detallePagoService: DetallePagoService) {}

  @Mutation(() => DetallePago)
  createDetallePago(
    @Args('createDetallePagoInput') createDetallePagoInput: CreateDetallePagoInput,
  ): Promise<DetallePago> {
    return this.detallePagoService.create(createDetallePagoInput);
  }

  @Query(() => [DetallePago], { name: 'detallesPago' })
  findAll(): Promise<DetallePago[]> {
    return this.detallePagoService.findAll();
  }

  @Query(() => DetallePago, { name: 'detallePago' })
  findOne(@Args('id', { type: () => ID }) id: string): Promise<DetallePago> {
    return this.detallePagoService.findOne(id);
  }

  @Mutation(() => DetallePago)
  updateDetallePago(
    @Args('updateDetallePagoInput') updateDetallePagoInput: UpdateDetallePagoInput,
  ): Promise<DetallePago> {
    return this.detallePagoService.update(updateDetallePagoInput.id, updateDetallePagoInput);
  }

  @Mutation(() => DetallePago)
  removeDetallePago(@Args('id', { type: () => ID }) id: string): Promise<DetallePago> {
    return this.detallePagoService.remove(id);
  }
}
