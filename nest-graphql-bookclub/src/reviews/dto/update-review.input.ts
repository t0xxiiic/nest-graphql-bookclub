import { CreateReviewInput } from './create-review.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReviewInput extends PartialType(CreateReviewInput) {
  @Field()
  id: string;
}
