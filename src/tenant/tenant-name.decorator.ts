import { applyDecorators, Injectable, Scope } from '@nestjs/common';
import { Entity } from 'typeorm';

export const TenantName = (databaesName: string) =>
  applyDecorators(Entity({ database: databaesName }));
