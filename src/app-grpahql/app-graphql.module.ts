import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { upperDirectiveTransformer } from '@app/app-grpahql/directives/upper-directive-transformer';
//import { DirectiveLocation, GraphQLDirective } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      introspection: true,
      autoSchemaFile: 'schema.gql',
    //  transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      //buildSchemaOptions: {
      //  directives: [
      //    new GraphQLDirective({
      //      name: 'upper',
      //      locations: [DirectiveLocation.FIELD_DEFINITION],
      //    }),
      //  ],
      //},
    }),
  ],
})
export class AppGraphqlModule {}
