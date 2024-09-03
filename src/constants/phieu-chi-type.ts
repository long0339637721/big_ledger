// Salary costs: Chi phí lương
// Bonus costs: Chi phí thưởng
// Tax expenses: Chi phí thuế
// Rent expenses: chi phí thuê mặt bằng, văn phòng
// marketing expenses: chi phí quảng cáo và tiếp thị
// Utility costs: Chi phí tiện ích (điện nước)
// Logistics costs: Chi phí vận chuyển và logistics
// Administrative costs: Chi phí hành chính (văn phòng phẩm)
// Training costs: Chi phí đào tạo và phát triển
// Legal costs: Chi phí tư vấn pháp lý, giấy phép...
// Insurance costs: Chi phí bảo hiểm
// Depreciation costs: Chi phí khấu hao
// Financial costs: Chi phí tài chính (lãi vay, phí ngân hàng, giao dịch...)
// RaD costs: Chi phí nghiên cứu và phát triển
// Other costs: Chi phí khác
import { type ValueOf } from '../interfaces';
export const PHIEU_CHI_TYPE = {
  SALARY_COSTS: 'SALARY_COSTS',
  BONUS_COSTS: 'BONUS_COSTS',
  TAX_EXPENSES: 'TAX_EXPENSES',
  RENT_EXPENSES: 'RENT_EXPENSES',
  MARKETING_EXPENSES: 'MARKETING_EXPENSES',
  UTILITY_COSTS: 'UTILITY_COSTS',
  LOGISTICS_COSTS: 'LOGISTICS_COSTS',
  ADMINISTRATIVE_COSTS: 'ADMINISTRATIVE_COSTS',
  TRAINING_COSTS: 'TRAINING_COSTS',
  LEGAL_COSTS: 'LEGAL_COSTS',
  INSURANCE_COSTS: 'INSURANCE_COSTS',
  DEPRECIATION_COSTS: 'DEPRECIATION_COSTS',
  FINANCIAL_COSTS: 'FINANCIAL_COSTS',
  RAD_COSTS: 'RAD_COSTS',
  OTHER_COSTS: 'OTHER_COSTS',
} as const;

export type PhieuChiType = ValueOf<typeof PHIEU_CHI_TYPE>;
