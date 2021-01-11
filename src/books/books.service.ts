import { Inject } from '@nestjs/common';

import { TenantService } from '../tenant/tenant-service.decorator';
import { TENANT_CONNECTION } from '../tenant/tenant.module';
// import { BookEntity,Book, BookEntity1 } from './book.entity';
import { Connection, getManager, getCustomRepository, Entity } from 'typeorm';
import { TenantName } from 'src/tenant/tenant-name.decorator';
import { Book } from './book.entity';
// import { Book } from './book.entity.interface';

@TenantService()
@TenantName('tenant3')
export class BooksService {
  constructor(@Inject(TENANT_CONNECTION) private connection: Connection) {}

  async findAll(): Promise<Book[]> {
    const repository = await this.connection
      .getRepository(Book)
      .createQueryBuilder();
    console.log(repository.expressionMap.mainAlias);
    return repository.getMany();
  }
}
