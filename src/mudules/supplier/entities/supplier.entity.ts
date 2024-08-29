import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { AbstractEntity } from '../../../common/abstract.entity';
import { Product } from '../../product/entities/product.entity';
import { SupplierGroup } from './supplier-group.entity';
import { DonMuaHang } from 'src/mudules/don-mua-hang/entities/don-mua-hang.entity';
import { PhieuChiTienMat } from 'src/mudules/phieu-chi/entities/phieu-chi.entity';
import { ReportCpmhProductDetail } from 'src/mudules/report-cpmh/entities/report-cpmh.entity';

@Entity({ name: 'suppliers' })
export class Supplier extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'varchar' })
  representative: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ type: 'varchar' })
  accountNumber: string;

  @Column({ type: 'varchar' })
  accountName: string;

  @Column({ type: 'varchar' })
  bankName: string;

  @Column({ type: 'varchar', nullable: true })
  branch?: string;

  @ManyToMany(() => Product, (product) => product.suppliers)
  @JoinTable({ name: 'product_of_supplier' })
  products: Product[];

  @ManyToOne(() => SupplierGroup, (supplierGroup) => supplierGroup.suppliers, {
    nullable: false,
  })
  supplierGroup: SupplierGroup;

  @OneToMany(() => DonMuaHang, (donMuaHang) => donMuaHang.supplier)
  donMuaHangs: DonMuaHang[];

  @OneToMany(() => PhieuChiTienMat, (phieuChi) => phieuChi.supplier)
  phieuChi: PhieuChiTienMat[];

  @OneToMany(
    () => ReportCpmhProductDetail,
    (reportCpmhProductDetail) => reportCpmhProductDetail.supplier,
  )
  reportCpmhProductDetails: ReportCpmhProductDetail[];
}
