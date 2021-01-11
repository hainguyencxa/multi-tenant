import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, createConnection, getConnection } from 'typeorm';

import { Tenant } from './tenant.entity';
import { Book } from '../books/book.entity';
import { connect } from 'net';
// import { Book, BookEntity, BookEntity1 } from '../books/book.entity';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [
    {
      provide: TENANT_CONNECTION,
      inject: [REQUEST, Connection],
      scope: Scope.REQUEST,
      useFactory: async (request, connection) => {
        const tenant: Tenant = await connection
          .getRepository(Tenant)
          .findOne({ where: { host: request.headers.abc } });
        const connnect: Connection = getConnection('tenant1');
        connnect.entityMetadatas.map(
          item => (item.tablePath = tenant.name + '.' + item.tableName),
        );
        return connnect;
      },
    },
  ],
  exports: [TENANT_CONNECTION],
})
export class TenantModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req, res, next) => {
        console.log(req.headers.abc);
        const tenant: Tenant = await this.connection
          .getRepository(Tenant)
          .findOne({ where: { host: req.headers.abc } });

        if (!tenant) {
          throw new BadRequestException(
            'Database Connection Error',
            'There is a Error with the Database!',
          );
        }

        try {
          getConnection('tenant1');
          next();
        } catch (e) {
          const createdConnection: Connection = await createConnection({
            name: 'tenant1',
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'tenant1',
            entities: [Book],
            synchronize: true,
            logging: true,
          });
          if (createdConnection) {
            next();
          } else {
            throw new BadRequestException(
              'Database Connection Error',
              'There is a Error with the Database!',
            );
          }
        }
      })
      .forRoutes('*');
  }
}
