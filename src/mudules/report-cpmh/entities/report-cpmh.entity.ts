import { AbstractEntity } from 'src/common/abstract.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Supplier } from 'src/mudules/supplier/entities';
import { Product } from 'src/mudules/product/entities/product.entity';
import { Ctmua } from 'src/mudules/ctmua/entities/ctmua.entity';

@Entity({ name: 'report_cpmh' })
export class ReportCpmh extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'float' })
  totalCost: number;

  @OneToMany(
    () => ReportCpmhDetail,
    (reportCpmhDetail) => reportCpmhDetail.reportCpmh,
  )
  reportCpmhDetails: ReportCpmhDetail[];
}

@Entity({ name: 'report_cpmh_detail' })
export class ReportCpmhDetail extends AbstractEntity {
  @ManyToOne(() => Product, (product) => product.reportCpmhDetails)
  product: Product;

  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'float' })
  productValue: number;

  @Column({ type: 'float' })
  discountValue: number;

  @Column({ type: 'float' })
  totalValue: number;

  @ManyToOne(() => ReportCpmh, (reportCpmh) => reportCpmh.reportCpmhDetails)
  reportCpmh: ReportCpmh;

  @OneToMany(
    () => ReportCpmhProductDetail,
    (reportCpmhProductDetail) => reportCpmhProductDetail.reportCpmhDetail,
  )
  reportCpmhProductDetails: ReportCpmhProductDetail[];
}

@Entity({ name: 'report_cpmh_product_detail' })
export class ReportCpmhProductDetail extends AbstractEntity {
  @ManyToOne(() => Supplier, (supplier) => supplier.reportCpmhProductDetails)
  supplier: Supplier;

  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'float' })
  productValue: number;

  @Column({ type: 'float' })
  discountValue: number;

  @Column({ type: 'float' })
  totalValue: number;

  @ManyToMany(() => Ctmua, (ctmua) => ctmua.reportCpmhProductDetails)
  @JoinTable()
  ctmuas: Ctmua[];

  @ManyToOne(
    () => ReportCpmhDetail,
    (reportCpmhDetail) => reportCpmhDetail.reportCpmhProductDetails,
  )
  reportCpmhDetail: ReportCpmhDetail;
}
