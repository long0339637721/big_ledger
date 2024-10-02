import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreateProductGroupDto,
} from './dto/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductGroupDto,
} from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorators/http.decorators';
import { USER_ROLE } from 'src/constants';

@ApiTags('Doi tuong')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new product' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all product' })
  findAll() {
    return this.productService.findAll();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get product by id' })
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  @ApiOperation({ description: 'Update product by id' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}

@ApiTags('Doi tuong')
@Controller('product-group')
export class ProductGroupController {
  constructor(private readonly productService: ProductService) {}

  @Auth(USER_ROLE.ACCOUNTANT)
  @Post()
  @ApiOperation({ description: 'Create new product group' })
  create(@Body() createProductGroupDto: CreateProductGroupDto) {
    return this.productService.createGroup(createProductGroupDto);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get()
  @ApiOperation({ description: 'Get all product group' })
  findAll() {
    return this.productService.findAllGroup();
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Get(':id')
  @ApiOperation({ description: 'Get product group by id' })
  findOne(@Param('id') id: string) {
    return this.productService.findOneGroup(+id);
  }

  @Auth(USER_ROLE.ACCOUNTANT)
  @Patch(':id')
  @ApiOperation({ description: 'Update product group by id' })
  update(
    @Param('id') id: string,
    @Body() updateProductGroupDto: UpdateProductGroupDto,
  ) {
    return this.productService.updateGroup(+id, updateProductGroupDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.removeGroup(+id);
  // }
}
