import { AbstractEntity } from 'src/common/abstract.entity';
import { Ctban } from 'src/mudules/ctban/entities/ctban.entity';
import { Customer } from 'src/mudules/customer/entities/customer.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'report_dccn' })
@Index(['id'], { unique: true })
export class ReportDccn extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @OneToMany(
    () => ReportDccnDetail,
    (reportDccnDetail) => reportDccnDetail.reportDccn,
  )
  reportDccnDetails: ReportDccnDetail[];
}

@Entity({ name: 'report_dccn_details' })
@Index(['id'], { unique: true })
export class ReportDccnDetail extends AbstractEntity {
  @ManyToOne(() => Customer, (customer) => customer.reportDccnDetails, {
    nullable: false,
  })
  customer: Customer;

  @Column({ type: 'float' })
  collectedTotal: number;

  @Column({ type: 'float' })
  notCollectedTotal: number;

  @Column({ type: 'float', default: 0 })
  inOfDate: number;

  @Column({ type: 'float', default: 0 })
  outOfDate: number;

  @OneToMany(
    () => ReportDccnCustomerDetail,
    (reportDccnCustomerDetail) => reportDccnCustomerDetail.reportDccnDetail,
  )
  reportDccnCustomerDetails: ReportDccnCustomerDetail[];

  @ManyToOne(() => ReportDccn, (reportDccn) => reportDccn.reportDccnDetails, {
    nullable: false,
  })
  reportDccn: ReportDccn;
}

@Entity({ name: 'report_dccn_customer_details' })
@Index(['id'], { unique: true })
export class ReportDccnCustomerDetail extends AbstractEntity {
  @ManyToOne(() => Ctban, (ctban) => ctban.reportDccnCustomerDetails, {
    nullable: false,
  })
  ctban: Ctban;

  @Column({ type: 'float' })
  collected: number;

  @Column({ type: 'float' })
  notCollected: number;

  @Column({ type: 'float', default: 0 })
  inOfDate: number;

  @Column({ type: 'float', default: 0 })
  outOfDate: number;

  @ManyToOne(
    () => ReportDccnDetail,
    (reportDccnDetail) => reportDccnDetail.reportDccnCustomerDetails,
    {
      nullable: false,
    },
  )
  reportDccnDetail: ReportDccn;
}
