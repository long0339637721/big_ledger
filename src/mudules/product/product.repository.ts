import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product, ProductGroup } from './entities';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  CreateProductDto,
  CreateProductGroupDto,
} from './dto/create-product.dto';

@Injectable()
export class ProductRepository {
  private readonly productRepository: Repository<Product>;
  private readonly productGroupRepository: Repository<ProductGroup>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.productRepository = this.dataSource.getRepository(Product);
    this.productGroupRepository = this.dataSource.getRepository(ProductGroup);
  }

  createGroup(createProductGroupDto: CreateProductGroupDto) {
    return this.productGroupRepository.save(createProductGroupDto);
  }

  create(createProductDto: CreateProductDto, productGroup: ProductGroup) {
    const newProduct = this.productRepository.create({
      ...createProductDto,
      productGroup: productGroup,
    });
    return this.productRepository.save(newProduct);
  }

  findAllGroup() {
    return this.productGroupRepository.find({
      relations: {
        products: true,
      },
    });
  }

  findAll() {
    return this.productRepository.find({
      relations: {
        productGroup: true,
        // suppliers: true,
      },
    });
  }

  findOneGroup(id: number) {
    return this.productGroupRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        products: true,
      },
    });
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        productGroup: true,
        // suppliers: true,
      },
    });
  }

  removeGroup(id: number) {
    return this.productGroupRepository.delete(id);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }

  updateGroup(id: number, productGroup: ProductGroup) {
    return this.productGroupRepository.update(id, productGroup);
  }

  update(id: number, product: Product) {
    return this.productRepository.update(id, product);
  }
}
