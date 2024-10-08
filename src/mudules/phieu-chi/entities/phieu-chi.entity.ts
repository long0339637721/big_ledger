import { Column, Entity, Index, ManyToOne, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from 'src/common/abstract.entity';
import {
  Accountant,
  PurchasingOfficer,
} from 'src/mudules/employee/entities/employee.entity';
import { Supplier } from 'src/mudules/supplier/entities';
import { BankAccount } from 'src/mudules/bank-account/entities/bank-account.entity';
import { Ctmua } from 'src/mudules/ctmua/entities/ctmua.entity';
import { PHIEU_CHI_TYPE, PhieuChiType } from 'src/constants/phieu-chi-type';

@Entity({ name: 'phieu_chi_tien_mat' })
@Index(['id'], { unique: true })
export class PhieuChiTienMat extends AbstractEntity {
  @Column({ type: 'date' })
  paymentDate: Date;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @Column({ type: 'varchar', nullable: true })
  receiver?: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.phieuChi, {
    nullable: false,
  })
  supplier?: Supplier;

  @ManyToOne(
    () => PurchasingOfficer,
    (purchasingOfficer) => purchasingOfficer.phieuChi,
    { nullable: false },
  )
  purchasingOfficer: PurchasingOfficer;

  @OneToMany(
    () => ChungTuCuaPhieuChiTienMat,
    (chungTu) => chungTu.phieuChiTienMat,
  )
  chungTu: ChungTuCuaPhieuChiTienMat[];
}

@Entity({ name: 'phieu_chi_tien_gui' })
@Index(['id'], { unique: true })
export class PhieuChiTienGui extends AbstractEntity {
  @Column({ type: 'date' })
  paymentDate: Date;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @Column({ type: 'varchar', nullable: true })
  receiver?: string;

  @ManyToOne(() => Supplier, (supplier) => supplier.phieuChi, {
    nullable: false,
  })
  supplier?: Supplier;

  @ManyToOne(
    () => PurchasingOfficer,
    (purchasingOfficer) => purchasingOfficer.phieuChi,
    { nullable: false },
  )
  purchasingOfficer: PurchasingOfficer;

  @OneToMany(
    () => ChungTuCuaPhieuChiTienGui,
    (chungTu) => chungTu.phieuChiTienGui,
  )
  chungTu: ChungTuCuaPhieuChiTienGui[];

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.phieuChi, {
    nullable: false,
  })
  bankAccount: BankAccount;

  @Column({ type: 'boolean', default: false })
  reconciled: boolean;
}

@Entity({ name: 'chung_tu_cua_phieu_chi_tien_mat' })
@Index(['id'], { unique: true })
@Unique(['phieuChiTienMat', 'ctmua'])
export class ChungTuCuaPhieuChiTienMat extends AbstractEntity {
  @Column({ type: 'float', default: 0 })
  money: number;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @ManyToOne(() => PhieuChiTienMat, (phieuChi) => phieuChi.chungTu, {
    nullable: false,
  })
  phieuChiTienMat: PhieuChiTienMat;

  @ManyToOne(() => Ctmua, (ctmua) => ctmua.phieuChiTienMat, { nullable: false })
  ctmua: Ctmua;
}

@Entity({ name: 'chung_tu_cua_phieu_chi_tien_gui' })
@Index(['id'], { unique: true })
@Unique(['phieuChiTienGui', 'ctmua'])
export class ChungTuCuaPhieuChiTienGui extends AbstractEntity {
  @Column({ type: 'float', default: 0 })
  money: number;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @ManyToOne(() => PhieuChiTienGui, (phieuChi) => phieuChi.chungTu, {
    nullable: false,
  })
  phieuChiTienGui: PhieuChiTienGui;

  @ManyToOne(() => Ctmua, (ctmua) => ctmua.phieuChiTienGui, { nullable: false })
  ctmua: Ctmua;
}

@Entity({ name: 'phieu_chi_khac' })
@Index(['id'], { unique: true })
export class PhieuChiKhac extends AbstractEntity {
  @Column({ type: 'date' })
  paymentDate: Date;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @Column({ type: 'float', default: 0 })
  money: number;

  @Column({
    type: 'enum',
    enum: PHIEU_CHI_TYPE,
    default: PHIEU_CHI_TYPE.OTHER_COSTS,
  })
  type: PhieuChiType;

  @ManyToOne(() => Accountant, (accountant) => accountant.phieuChiKhac, {
    nullable: false,
  })
  accountant: Accountant;

  @Column({ type: 'boolean', default: true })
  isTienMat: boolean;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.phieuChiKhac, {
    nullable: true,
  })
  bankAccount: BankAccount;

  @Column({ type: 'boolean', default: false })
  reconciled: boolean;
}
