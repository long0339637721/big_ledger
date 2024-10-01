import { CUSTOMER_STATUS, CustomerStatusType } from '../../../constants';
import { AbstractEntity } from '../../../common/abstract.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { DonBanHang } from '../../don-ban-hang/entities/don-ban-hang.entity';
import { PhieuThuTienMat } from 'src/mudules/phieu-thu/entities/phieu-thu.entity';
import { DieuKhoan } from 'src/mudules/dieu-khoan/entities/dieu-khoan.entity';
import { Cktm } from 'src/mudules/cktm/entities/cktm.entity';
import { ReportThcnDetail } from 'src/mudules/report-thcn/entities/report-thcn.entity';
import { ReportDccnDetail } from 'src/mudules/report-dccn/entities/report-dccn.entity';

@Entity({ name: 'customer_groups' })
@Index(['id'], { unique: true })
export class CustomerGroup extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  note?: string;

  @OneToMany(() => Customer, (customer) => customer.customerGroup)
  customers: Customer[];
}

@Entity({ name: 'customers' })
@Index(['id'], { unique: true })
export class Customer extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', nullable: false, default: '123456789' })
  taxCode: string;

  @Column({ type: 'varchar', nullable: true })
  email?: string;

  @Column({ type: 'varchar', nullable: true })
  address?: string;

  @Column({ type: 'varchar', nullable: true })
  note?: string;

  @Column({
    type: 'enum',
    enum: CUSTOMER_STATUS,
    default: CUSTOMER_STATUS.ACTIVE,
  })
  status: CustomerStatusType;

  @OneToMany(() => DonBanHang, (donBanHang) => donBanHang.customer)
  donBanHangs: DonBanHang[];

  @OneToMany(() => PhieuThuTienMat, (phieuThu) => phieuThu.customer)
  phieuThu: PhieuThuTienMat[];

  @ManyToOne(() => CustomerGroup, (customerGroup) => customerGroup.customers)
  customerGroup: CustomerGroup;

  @OneToMany(() => DieuKhoan, (dieuKhoan) => dieuKhoan.customer)
  dieuKhoans: DieuKhoan;

  @OneToMany(() => Cktm, (cktm) => cktm.customer)
  cktms: Cktm;

  @OneToMany(
    () => ReportThcnDetail,
    (reportThcnDetail) => reportThcnDetail.customer,
  )
  reportThcnDetails: ReportThcnDetail[];

  @OneToMany(
    () => ReportDccnDetail,
    (reportDccnDetail) => reportDccnDetail.customer,
  )
  reportDccnDetails: ReportDccnDetail[];
}
