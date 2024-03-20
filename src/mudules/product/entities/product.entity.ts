import { AbstractEntity } from '../../../common/abstract.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { UnitType, UNIT } from '../../../constants';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { ProductGroup } from './product-group.entity';
import { ProductOfDonBanHang } from 'src/mudules/don-ban-hang/entities/don-ban-hang.entity';
import { ProductOfDonMuaHang } from 'src/mudules/don-mua-hang/entities/don-mua-hang.entity';
import { ProductOfCtban } from 'src/mudules/ctban/entities/ctban.entity';
import { ProductOfCtmua } from 'src/mudules/ctmua/entities/ctmua.entity';

@Entity({ name: 'products' })
export class Product extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'int' })
  priceReceived: number;

  @Column({ type: 'int' })
  priceDelivery: number;

  @Column({ type: 'int', default: 0 })
  category: number = 0;

  @Column({ type: 'enum', enum: UNIT })
  unit: UnitType;

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  suppliers: Supplier[];

  @ManyToOne(() => ProductGroup, (productGroup) => productGroup.products, {
    nullable: false,
  })
  productGroup: ProductGroup;

  @OneToMany(
    () => ProductOfDonBanHang,
    (productOfDonBanHang) => productOfDonBanHang.product,
  )
  productOfDonBanHangs: ProductOfDonBanHang[];

  @OneToMany(
    () => ProductOfDonMuaHang,
    (productOfDonMuaHang) => productOfDonMuaHang.product,
  )
  productOfDonMuaHangs: ProductOfDonMuaHang[];

  @OneToMany(() => ProductOfCtban, (productOfCtban) => productOfCtban.product)
  productOfCtban: ProductOfCtban[];

  @OneToMany(() => ProductOfCtmua, (productOfCtmua) => productOfCtmua.product)
  productOfCtmua: ProductOfCtmua[];
}
