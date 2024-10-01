import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import { DELIVERY_STATUS, DeliveryStatusType } from '../../../constants';
import { Customer } from '../../customer/entities/customer.entity';
import { Product } from 'src/mudules/product/entities/product.entity';
import { Salesperson } from 'src/mudules/employee/entities/employee.entity';
import { Ctban } from 'src/mudules/ctban/entities/ctban.entity';
import { DieuKhoan } from 'src/mudules/dieu-khoan/entities/dieu-khoan.entity';
import { Cktm } from 'src/mudules/cktm/entities/cktm.entity';

@Entity({ name: 'don_ban_hang' })
@Index(['id'], { unique: true })
export class DonBanHang extends AbstractEntity {
  @Column({ type: 'date' })
  saleDate: Date;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @Column({ type: 'date' })
  deliveryTerm: Date;

  @Column({
    type: 'enum',
    enum: DELIVERY_STATUS,
    default: DELIVERY_STATUS.NOT_DELIVERED,
  })
  deliveryStatus: DeliveryStatusType;

  @ManyToOne(() => Salesperson, (salesperson) => salesperson.donBanHangs, {
    nullable: false,
  })
  salesperson: Salesperson;

  @ManyToOne(() => Customer, (customer) => customer.donBanHangs, {
    nullable: false,
  })
  customer: Customer;

  @Column({ type: 'int', default: 7 })
  paymentPeriod: number;

  @Column({ type: 'int', default: 0 })
  discountRate: number;

  @OneToMany(
    () => ProductOfDonBanHang,
    (productOfDonBanHang) => productOfDonBanHang.donBanHang,
  )
  productOfDonBanHangs: ProductOfDonBanHang[];

  @OneToMany(() => Ctban, (ctban) => ctban.donBanHang)
  ctban: Ctban[];
}

@Entity({ name: 'product_of_don_ban_hang' })
@Index(['id'], { unique: true })
export class ProductOfDonBanHang extends AbstractEntity {
  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'int', default: 0 })
  delivered: number;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(
    () => DonBanHang,
    (donBanHang) => donBanHang.productOfDonBanHangs,
    { nullable: false },
  )
  donBanHang: DonBanHang;

  @ManyToOne(() => Product, (product) => product.productOfDonBanHangs, {
    nullable: false,
  })
  product: Product;
}
