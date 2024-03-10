import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../../common/abstract.entity';
import { PhieuChiTienGui } from 'src/mudules/phieu-chi/entities/phieu-chi.entity';

@Entity({ name: 'bank_accounts' })
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
  note: string;

  @OneToMany(() => PhieuChiTienGui, (phieuChi) => phieuChi.bankAccount)
  phieuChi: PhieuChiTienGui[];
}
