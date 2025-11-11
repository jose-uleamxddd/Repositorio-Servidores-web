import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Operation {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
