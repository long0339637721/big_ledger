import { AbstractEntity } from 'src/common/abstract.entity';
import { Ctban } from 'src/mudules/ctban/entities/ctban.entity';
import { Salesperson } from 'src/mudules/employee/entities/employee.entity';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'report_dtbh' })
@Index(['id'], { unique: true })
export class ReportDtbh extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @OneToMany(
    () => ReportDtbhDetail,
    (reportDtbhDetail) => reportDtbhDetail.reportDtbh,
  )
  reportDtbhDetails: ReportDtbhDetail[];
}

@Entity({ name: 'report-dtbn-detail' })
@Index(['id'], { unique: true })
export class ReportDtbhDetail extends AbstractEntity {
  @ManyToOne(() => Salesperson, (salesperson) => salesperson.reportDtbhDetails)
  salesperson: Salesperson;

  @Column({ type: 'int' })
  totalProductValue: number;

  @Column({ type: 'int' })
  totalDiscountValue: number;

  @ManyToMany(() => Ctban, (ctban) => ctban.reportDtbhDetails)
  @JoinTable()
  ctbans: Ctban[];

  @ManyToOne(() => ReportDtbh, (reportDtbh) => reportDtbh.reportDtbhDetails)
  reportDtbh: ReportDtbh;
}
