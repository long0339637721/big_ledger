import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import { Customer } from 'src/mudules/customer/entities/customer.entity';
import { Salesperson } from 'src/mudules/employee/entities/employee.entity';
import { Ctban } from 'src/mudules/ctban/entities/ctban.entity';
import { BankAccount } from 'src/mudules/bank-account/entities/bank-account.entity';

@Entity({ name: 'phieu_thu_tien_mat' })
export class PhieuThuTienMat extends AbstractEntity {
  @Column({ type: 'date' })
  receiveDate: Date;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @Column({ type: 'varchar', nullable: true })
  submitter?: string;

  @ManyToOne(() => Customer, (customer) => customer.phieuThu, {
    nullable: false,
  })
  customer: Customer;

  @ManyToOne(() => Salesperson, (salesperson) => salesperson.phieuThu, {
    nullable: false,
  })
  salesperson: Salesperson;

  @OneToMany(
    () => ChungTuCuaPhieuThuTienMat,
    (chungTu) => chungTu.phieuThuTienMat,
  )
  chungTuCuaPhieuThu: ChungTuCuaPhieuThuTienMat[];
}

@Entity('phieu_thu_tien_gui')
export class PhieuThuTienGui extends AbstractEntity {
  @Column({ type: 'date' })
  receiveDate: Date;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @Column({ type: 'varchar', nullable: true })
  submitter?: string;

  @ManyToOne(() => Customer, (customer) => customer.phieuThu, {
    nullable: false,
  })
  customer: Customer;

  @ManyToOne(() => Salesperson, (salesperson) => salesperson.phieuThu, {
    nullable: false,
  })
  salesperson: Salesperson;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.phieuThu, {
    nullable: false,
  })
  bankAccount: BankAccount;

  @OneToMany(
    () => ChungTuCuaPhieuThuTienGui,
    (chungTu) => chungTu.phieuThuTienGui,
  )
  chungTuCuaPhieuThu: ChungTuCuaPhieuThuTienGui[];
}

@Entity({ name: 'chung_tu_cua_phieu_thu_tien_mat' })
export class ChungTuCuaPhieuThuTienMat extends AbstractEntity {
  @Column({ type: 'int' })
  money: number;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @ManyToOne(() => PhieuThuTienMat, (phieuThu) => phieuThu.chungTuCuaPhieuThu, {
    nullable: false,
  })
  phieuThuTienMat: PhieuThuTienMat;

  @ManyToOne(() => Ctban, (ctban) => ctban.phieuThuTienMat, { nullable: false })
  ctban: Ctban;
}

@Entity({ name: 'chung_tu_cua_phieu_thu_tien_gui' })
export class ChungTuCuaPhieuThuTienGui extends AbstractEntity {
  @Column({ type: 'int' })
  money: number;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @ManyToOne(() => PhieuThuTienGui, (phieuThu) => phieuThu.chungTuCuaPhieuThu, {
    nullable: false,
  })
  phieuThuTienGui: PhieuThuTienGui;

  @ManyToOne(() => Ctban, (ctban) => ctban.phieuThuTienGui, { nullable: false })
  ctban: Ctban;
}
