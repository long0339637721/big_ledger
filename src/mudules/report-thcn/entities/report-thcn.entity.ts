import { AbstractEntity } from 'src/common/abstract.entity';
import { Customer } from 'src/mudules/customer/entities/customer.entity';
import { Entity, Column, ManyToOne, OneToMany, Index } from 'typeorm';

@Entity({ name: 'report_thcn' })
@Index(['id'], { unique: true })
export class ReportThcn extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @OneToMany(
    () => ReportThcnDetail,
    (reportThcnDetail) => reportThcnDetail.reportThcn,
  )
  reportThcnDetails: ReportThcnDetail[];
}

@Entity({ name: 'report_thcn_details' })
@Index(['id'], { unique: true })
export class ReportThcnDetail extends AbstractEntity {
  @ManyToOne(() => Customer, (customer) => customer.reportThcnDetails, {
    nullable: false,
  })
  customer: Customer;

  @Column({ type: 'float', default: 0 })
  collectedTotal: number;

  @Column({ type: 'float' })
  outOfDate: number;

  @Column({ type: 'float' })
  inOfDate: number;

  @ManyToOne(() => ReportThcn, (reportThcn) => reportThcn.reportThcnDetails, {
    nullable: false,
  })
  reportThcn: ReportThcn;
}
