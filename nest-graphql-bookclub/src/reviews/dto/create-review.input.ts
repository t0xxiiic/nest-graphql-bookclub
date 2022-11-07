import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field()
  bookId: string;

  @Field()
  userId: string;

  @Field()
  comment: string;
}
