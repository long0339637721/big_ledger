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
import { Supplier } from 'src/mudules/supplier/entities';
import { Product } from 'src/mudules/product/entities/product.entity';
import { PurchasingOfficer } from 'src/mudules/employee/entities/employee.entity';
import { Ctmua } from 'src/mudules/ctmua/entities/ctmua.entity';

@Entity({ name: 'don_mua_hang' })
export class DonMuaHang extends AbstractEntity {
  @Column({ type: 'date', default: new Date() })
  purchasingDate: Date;

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

  @Column({ type: 'date', default: new Date() })
  deliveryTerm: Date;

  @ManyToOne(
    () => PurchasingOfficer,
    (purchasingOfficer) => purchasingOfficer.donMuaHangs,
    { nullable: false },
  )
  purchasingOfficer: PurchasingOfficer;

  @ManyToOne(() => Supplier, (supplier) => supplier.donMuaHangs, {
    nullable: false,
  })
  supplier: Supplier;

  @OneToMany(
    () => ProductOfDonMuaHang,
    (productOfDonMuaHang) => productOfDonMuaHang.donMuaHang,
  )
  productOfDonMuaHangs: ProductOfDonMuaHang[];

  @ManyToMany(() => Ctmua, (ctmua) => ctmua.donMuaHangs, {
    nullable: true,
  })
  ctmuas: Ctmua[];
}

@Entity({ name: 'product_of_don_mua_hang' })
export class ProductOfDonMuaHang extends AbstractEntity {
  @Column({ type: 'int', default: 0 })
  count: number;

  @Column({ type: 'int', default: 0 })
  delivered: number;

  @Column({ type: 'int', default: 0 })
  price: number;

  @ManyToOne(
    () => DonMuaHang,
    (donMuaHang) => donMuaHang.productOfDonMuaHangs,
    { nullable: false },
  )
  donMuaHang: DonMuaHang;

  @ManyToOne(() => Product, (product) => product.productOfDonMuaHangs, {
    nullable: false,
  })
  product: Product;
}
