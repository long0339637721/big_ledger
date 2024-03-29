import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import {
  DELIVERY_STATUS,
  DOCUMENT_STATUS,
  DeliveryStatusType,
  DocumentStatusType,
  PAYMENT_STATUS,
  PaymentStatusType,
} from '../../../constants';
import { Customer } from '../../customer/entities/customer.entity';
import { Product } from 'src/mudules/product/entities';
import { Salesperson } from 'src/mudules/employee/entities/employee.entity';
import { Ctban } from 'src/mudules/ctban/entities/ctban.entity';

@Entity({ name: 'don_ban_hang' })
export class DonBanHang extends AbstractEntity {
  @Column({ type: 'date' })
  saleDate: Date;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @Column({
    type: 'enum',
    enum: PAYMENT_STATUS,
    default: PAYMENT_STATUS.NOT_PAID,
  })
  paymentStatus: PaymentStatusType;

  @Column({
    type: 'enum',
    enum: DELIVERY_STATUS,
    default: DELIVERY_STATUS.NOT_DELIVERED,
  })
  deliveryStatus: DeliveryStatusType;

  @Column({
    type: 'enum',
    enum: DOCUMENT_STATUS,
    default: DOCUMENT_STATUS.UNDOCUMENTED,
  })
  documentStatus: DocumentStatusType;

  @Column({ type: 'date' })
  deliveryTerm: Date;

  @ManyToOne(() => Salesperson, (salesperson) => salesperson.donBanHangs, {
    nullable: false,
  })
  salesperson: Salesperson;

  @ManyToOne(() => Customer, (customer) => customer.donBanHangs, {
    nullable: false,
  })
  customer: Customer;

  @OneToMany(
    () => ProductOfDonBanHang,
    (productOfDonBanHang) => productOfDonBanHang.donBanHang,
  )
  productOfDonBanHangs: ProductOfDonBanHang[];

  @ManyToMany(() => Ctban, (ctban) => ctban.donBanHangs)
  ctbans: Ctban[];
}

@Entity({ name: 'product_of_don_ban_hang' })
export class ProductOfDonBanHang extends AbstractEntity {
  @Column({ type: 'int' })
  count: number;

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
