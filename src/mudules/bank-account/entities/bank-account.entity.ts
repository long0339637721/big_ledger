import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';
import { AbstractEntity } from '../../../common/abstract.entity';
import {
  PhieuChiKhac,
  PhieuChiTienGui,
} from 'src/mudules/phieu-chi/entities/phieu-chi.entity';
import { PhieuThuTienGui } from 'src/mudules/phieu-thu/entities/phieu-thu.entity';

@Entity({ name: 'bank_accounts' })
@Index(['id'], { unique: true })
export class BankAccount extends AbstractEntity {
  @Column({ type: 'varchar' })
  accountNumber: string;

  @Column({ type: 'varchar' })
  accountName: string;

  @Column({ type: 'varchar' })
  bankName: string;

  @Column({ type: 'varchar' })
  branch: string;

  @Column({ type: 'varchar', nullable: true })
  note?: string;

  @OneToMany(() => PhieuChiTienGui, (phieuChi) => phieuChi.bankAccount)
  phieuChi: PhieuChiTienGui[];

  @OneToMany(() => PhieuThuTienGui, (phieuThu) => phieuThu.bankAccount)
  phieuThu: PhieuThuTienGui[];

  @OneToMany(() => PhieuChiKhac, (phieuChi) => phieuChi.bankAccount)
  phieuChiKhac: PhieuChiKhac[];

  @OneToMany(() => Transaction, (transaction) => transaction.bankAccount)
  transactions: Transaction[];
}

@Entity({ name: 'Transaction' })
@Index(['id'], { unique: true })
@Unique(['transactionNumber'])
export class Transaction extends AbstractEntity {
  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar' })
  transactionNumber: string;

  @Column({ type: 'varchar', nullable: true })
  recipient: string;

  @Column({ type: 'varchar', nullable: true })
  counterPartyAccount: string;

  @Column({ type: 'varchar', nullable: true })
  counterPartyBank: string;

  @Column({ type: 'float', nullable: true })
  debit: number;

  @Column({ type: 'float', nullable: true })
  credit: number;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'float', default: 0 })
  transactionFee: number;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.transactions)
  bankAccount: BankAccount;

  @Column({ type: 'boolean', default: false })
  reconciled: boolean;

  @OneToOne(() => PhieuThuTienGui, { nullable: true })
  @JoinColumn()
  phieuThu: PhieuThuTienGui | null;

  @OneToOne(() => PhieuChiTienGui, { nullable: true })
  @JoinColumn()
  phieuChi: PhieuChiTienGui | null;

  @OneToOne(() => PhieuChiKhac, { nullable: true })
  @JoinColumn()
  phieuChiKhac: PhieuChiKhac | null;
}
