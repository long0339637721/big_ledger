import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract.entity';
import { Product } from 'src/mudules/product/entities/product.entity';
import { PAYMENT_STATUS, PaymentStatusType } from 'src/constants';
import { DonMuaHang } from 'src/mudules/don-mua-hang/entities/don-mua-hang.entity';
import { WarehouseKeeper } from 'src/mudules/employee/entities/employee.entity';
import { ChungTuCuaPhieuChi } from 'src/mudules/phieu-chi/entities/phieu-chi.entity';

@Entity({ name: 'ctmua' })
export class Ctmua extends AbstractEntity {
  @Column({ type: 'date', default: new Date() })
  deliveryDate: Date;

  @ManyToOne(
    () => WarehouseKeeper,
    (warehouseKeeper) => warehouseKeeper.ctmua,
    { nullable: false },
  )
  warehouseKeeper: WarehouseKeeper;

  @Column({
    type: 'enum',
    enum: Object.values(PAYMENT_STATUS),
    default: PAYMENT_STATUS.NOT_PAID,
  })
  paymentStatus: PaymentStatusType;

  @Column({ type: 'date' })
  paymentTerm: Date;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @Column({ type: 'varchar', nullable: true })
  shipper: string;

  @Column({ type: 'int' })
  totalProductValue: number;

  @Column({ type: 'int' })
  totalDiscountValue: number;

  @Column({ type: 'int' })
  finalValue: number;

  @Column({ type: 'int', default: 0 })
  paidValue: number;

  @ManyToOne(() => DonMuaHang, (donMuaHang) => donMuaHang.ctmuas, {
    nullable: false,
  })
  donMuaHang: DonMuaHang;

  @OneToMany(() => ProductOfCtmua, (productOfCtban) => productOfCtban.ctmua)
  productOfCtmua: ProductOfCtmua[];

  @OneToMany(() => ChungTuCuaPhieuChi, (phieuChi) => phieuChi.ctmua, {
    nullable: false,
  })
  phieuChi: ChungTuCuaPhieuChi[];
}

@Entity({ name: 'product_of_ctmua' })
export class ProductOfCtmua extends AbstractEntity {
  @Column({ type: 'int', default: 0 })
  count: number;

  @Column({ type: 'int', default: 0 })
  price: number;

  @ManyToOne(() => Ctmua, (ctmua) => ctmua.productOfCtmua, { nullable: false })
  ctmua: Ctmua;

  @ManyToOne(() => Product, (product) => product.productOfCtmua, {
    nullable: false,
  })
  product: Product;
}
