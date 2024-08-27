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

@Entity({ name: 'report_cost' })
export class ReportCost extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'int' })
  totalCost: number;

  @OneToMany(
    () => ReportCostDetail,
    (reportCostDetail) => reportCostDetail.reportCost,
  )
  reportCostDetails: ReportCostDetail[];
}

@Entity({ name: 'report-cost-detail' })
export class ReportCostDetail extends AbstractEntity {
  @ManyToOne(() => Product, (product) => product.reportCostDetails)
  product: Product;

  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'float' })
  productValue: number;

  @Column({ type: 'float' })
  discountValue: number;

  @Column({ type: 'float' })
  totalValue: number;

  @ManyToOne(() => ReportCost, (reportCost) => reportCost.reportCostDetails)
  reportCost: ReportCost;

  @OneToMany(
    () => ReportCostProductDetail,
    (reportCostProductDetail) => reportCostProductDetail.reportCostDetail,
  )
  reportCostProductDetails: ReportCostProductDetail[];
}

@Entity({ name: 'report-cost-product-detail' })
export class ReportCostProductDetail extends AbstractEntity {
  @ManyToOne(() => Supplier, (supplier) => supplier.reportCostProductDetails)
  supplier: Supplier;

  @Column({ type: 'int' })
  count: number;

  @Column({ type: 'float' })
  productValue: number;

  @Column({ type: 'float' })
  discountValue: number;

  @Column({ type: 'float' })
  totalValue: number;

  @ManyToMany(() => Ctmua, (ctmua) => ctmua.reportCostProductDetails)
  @JoinTable()
  ctmuas: Ctmua[];

  @ManyToOne(
    () => ReportCostDetail,
    (reportCostDetail) => reportCostDetail.reportCostProductDetails,
  )
  reportCostDetail: ReportCostDetail;
}
