import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import {
  SupplierController,
  SupplierGroupController,
} from './supplier.controller';
import { SupplierRepository } from './supplier.repository';
import { ProductModule } from '../product/product.module';

@Module({
  controllers: [SupplierController, SupplierGroupController],
  providers: [SupplierService, SupplierRepository],
  exports: [SupplierService],
  imports: [ProductModule],
})
export class SupplierModule {}
