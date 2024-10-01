import { AbstractEntity } from 'src/common/abstract.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'report_cost' })
@Index(['id'], { unique: true })
export class ReportCost extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  startDate: Date;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  endDate: Date;

  @Column({ type: 'float', default: 0 })
  revenue: number;

  @Column({ type: 'float', default: 0 })
  revenueDeduction: number;

  @Column({ type: 'float', default: 0 })
  netRevenue: number;

  @Column({ type: 'float', default: 0 })
  goodsCost: number;

  @Column({ type: 'float', default: 0 })
  grossProfit: number;

  @Column({ type: 'float', default: 0 })
  financeIncome: number;

  @Column({ type: 'float', default: 0 })
  financeExpense: number;

  @Column({ type: 'float', default: 0 })
  sellingExpense: number;

  @Column({ type: 'float', default: 0 })
  managementExpense: number;

  @Column({ type: 'float', default: 0 })
  operatingProfit: number;

  @Column({ type: 'float', default: 0 })
  otherIncome: number;

  @Column({ type: 'float', default: 0 })
  otherExpense: number;

  @Column({ type: 'float', default: 0 })
  otherProfit: number;

  @Column({ type: 'float', default: 0 })
  profitBeforeTax: number;

  @Column({ type: 'float', default: 0 })
  corporateIncomeTax: number;

  @Column({ type: 'float', default: 0 })
  profitAfterTax: number;
}
