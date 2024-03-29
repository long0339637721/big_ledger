import { CUSTOMER_STATUS, CustomerStatusType } from '../../../constants';
import { AbstractEntity } from '../../../common/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DonBanHang } from '../../don-ban-hang/entities/don-ban-hang.entity';
import { PhieuThuTienMat } from 'src/mudules/phieu-thu/entities/phieu-thu.entity';
import { Ctban } from 'src/mudules/ctban/entities/ctban.entity';

@Entity({ name: 'customer_groups' })
export class CustomerGroup extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  note?: string;

  @OneToMany(() => Customer, (customer) => customer.customerGroup)
  customers: Customer[];
}

@Entity({ name: 'customers' })
export class Customer extends AbstractEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  phone: string;

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

  @OneToMany(() => Ctban, (ctban) => ctban.customer)
  ctbans: Ctban[];

  @OneToMany(() => PhieuThuTienMat, (phieuThu) => phieuThu.customer)
  phieuThu: PhieuThuTienMat[];

  @ManyToOne(() => CustomerGroup, (customerGroup) => customerGroup.customers)
  customerGroup: CustomerGroup;
}
