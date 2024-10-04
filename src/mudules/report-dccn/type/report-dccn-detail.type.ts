import { Ctban } from 'src/mudules/ctban/entities/ctban.entity';
import { Customer } from 'src/mudules/customer/entities/customer.entity';

export type ReportDccnDetailType = {
  customer: Customer;
  collectedTotal: number;
  notCollectedTotal: number;
  inOfDate: number;
  outOfDate: number;
  ctbans: {
    ctban: Ctban;
    collected: number;
    notCollected: number;
    inOfDate: number;
    outOfDate: number;
  }[];
};
