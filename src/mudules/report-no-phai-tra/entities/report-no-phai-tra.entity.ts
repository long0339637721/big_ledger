import { AbstractEntity } from 'src/common/abstract.entity';
import { Ctmua } from 'src/mudules/ctmua/entities/ctmua.entity';
import { Supplier } from 'src/mudules/supplier/entities';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'report_no_phai_tra' })
@Index(['id'], { unique: true })
export class ReportNoPhaiTra extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @OneToMany(
    () => ReportNoPhaiTraDetail,
    (reportNoPhaiTraDetail) => reportNoPhaiTraDetail.reportNoPhaiTra,
  )
  reportNoPhaiTraDetails: ReportNoPhaiTraDetail[];
}

@Entity({ name: 'report_no_phai_tra_details' })
@Index(['id'], { unique: true })
export class ReportNoPhaiTraDetail extends AbstractEntity {
  @ManyToOne(() => Supplier, (supplier) => supplier.reportNoPhaiTraDetails, {
    nullable: false,
  })
  supplier: Supplier;

  @Column({ type: 'float' })
  total: number;

  @Column({ type: 'float' })
  paid: number;

  @Column({ type: 'float' })
  inOfDate: number;

  @Column({ type: 'float' })
  outOfDate: number;

  @ManyToOne(
    () => ReportNoPhaiTra,
    (reportNoPhaiTra) => reportNoPhaiTra.reportNoPhaiTraDetails,
    {
      nullable: false,
    },
  )
  reportNoPhaiTra: ReportNoPhaiTra;

  @OneToMany(
    () => ReportNoPhaiTraSupplierDetail,
    (reportNoPhaiTraSupplierDetail) =>
      reportNoPhaiTraSupplierDetail.reportNoPhaiTraDetail,
  )
  reportNoPhaiTraSupplierDetails: ReportNoPhaiTraSupplierDetail[];
}

@Entity({ name: 'report_no_phai_tra_supplier_details' })
@Index(['id'], { unique: true })
export class ReportNoPhaiTraSupplierDetail extends AbstractEntity {
  @ManyToOne(() => Ctmua, (ctmua) => ctmua.reportNoPhaiTraSupplierDetails, {
    nullable: false,
  })
  ctmua: Ctmua;

  @Column({ type: 'float' })
  total: number;

  @Column({ type: 'float' })
  paid: number;

  @Column({ type: 'float' })
  inOfDate: number;

  @Column({ type: 'float' })
  outOfDate: number;

  @ManyToOne(
    () => ReportNoPhaiTraDetail,
    (reportNoPhaiTraDetail) =>
      reportNoPhaiTraDetail.reportNoPhaiTraSupplierDetails,
    {
      nullable: false,
    },
  )
  reportNoPhaiTraDetail: ReportNoPhaiTraDetail;
}
