import { Args, ArgsType, Context, Field, Float, ID, Info, InputType, Int, Mutation, ObjectType, Query, ResolveField, Resolver, Root, registerEnumType } from "@nestjs/graphql";
import * as graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { DeleteOneUserArgs } from "./args/DeleteOneUserArgs";
import { User } from "../../../models/User";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@Resolver(_of => User)
export class DeleteOneUserResolver {
  @Mutation(_returns => User, {
    nullable: true
  })
  async deleteOneUser(@Context() ctx: any, @Info() info: GraphQLResolveInfo, @Args() args: DeleteOneUserArgs): Promise<User | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).user.delete({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
