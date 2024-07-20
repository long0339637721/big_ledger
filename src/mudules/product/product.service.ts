import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductGroupDto,
} from './dto/update-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  createGroup(createProductGroupDto: any) {
    return this.productRepository.createGroup(createProductGroupDto);
  }

  async create(createProductDto: CreateProductDto) {
    const productGroup = await this.productRepository.findOneGroup(
      createProductDto.productGroupId,
    );
    if (!productGroup) {
      throw new NotFoundException('Product group not found');
    }
    return this.productRepository.create(createProductDto, productGroup);
  }

  findAllGroup() {
    return this.productRepository.findAllGroup();
  }

  findAll() {
    return this.productRepository.findAll();
  }

  async findByIds(ids: number[]) {
    const product = await this.productRepository.findByIds(ids);
    if (product.length !== ids.length) {
      throw new NotFoundException('Some products not found');
    }
    return product;
  }

  async findOneGroup(id: number) {
    const productGroup = await this.productRepository.findOneGroup(id);
    if (!productGroup) {
      throw new NotFoundException('Product group not found');
    }
    return productGroup;
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateGroup(id: number, updateProductGroupDto: UpdateProductGroupDto) {
    await this.findOneGroup(id);
    return this.productRepository.updateGroup(id, updateProductGroupDto);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.productRepository.update(id, updateProductDto);
  }

  async orderProduct(id: number, count: number, isPuerchase: boolean = false) {
    const product = await this.findOne(id);
    if (!isPuerchase) {
      return this.productRepository.deliverProduct(
        id,
        product.category - count,
        product.ordered + count,
        product.arriving,
      );
    }
    return this.productRepository.deliverProduct(
      id,
      product.category,
      product.ordered,
      product.arriving + count,
    );
  }

  async deliverProduct(
    id: number,
    count: number,
    isPuerchase: boolean = false,
  ) {
    const product = await this.findOne(id);
    if (!isPuerchase) {
      return this.productRepository.deliverProduct(
        id,
        product.category,
        product.ordered - count,
        product.arriving,
      );
    }
    return this.productRepository.deliverProduct(
      id,
      product.category + count,
      product.ordered,
      product.arriving - count,
    );
  }

  removeGroup(id: number) {
    return this.productRepository.removeGroup(id);
  }

  remove(id: number) {
    return this.productRepository.remove(id);
  }
}
