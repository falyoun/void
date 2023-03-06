import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';

export class PaginatedPayload<T> {
  @ApiProperty()
  count: number;
  @ApiProperty()
  data: T[];
}
export class RiaPayload<T> {
  @ApiProperty()
  data: T;
}

export const ApiRiaPayload = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(RiaPayload) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};

export const ApiPaginatedPayload = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedPayload) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
