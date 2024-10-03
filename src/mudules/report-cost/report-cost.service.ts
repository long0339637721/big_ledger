import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportCostDto } from './dto/create-report-cost.dto';
import { UpdateReportCostDto } from './dto/update-report-cost.dto';
import { ReportCostRepository } from './report-cost.repository';
import { CtmuaService } from '../ctmua/ctmua.service';
import { EmployeeService } from '../employee/employee.service';
import { CtbanService } from '../ctban/ctban.service';
import { PhieuChiService } from '../phieu-chi/phieu-chi.service';
import { PHIEU_CHI_TYPE } from 'src/constants/phieu-chi-type';

@Injectable()
export class ReportCostService {
  constructor(
    private readonly reportCostRepository: ReportCostRepository,
    private readonly ctmuaService: CtmuaService,
    private readonly ctbanService: CtbanService,
    private readonly employeeService: EmployeeService,
    private readonly phieuChiService: PhieuChiService,
  ) {}

  async create(
    createReportCostDto: CreateReportCostDto,
    isRaw: boolean = false,
  ) {
    const startDate = new Date(createReportCostDto.startDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(createReportCostDto.endDate);
    endDate.setHours(23, 59, 59, 999);
    const ctmuas = await this.ctmuaService.findByDate(startDate, endDate);
    const ctbans = await this.ctbanService.findByDate(startDate, endDate);
    const phieuChiKhacs = await this.phieuChiService.findAllKhacByDate(
      startDate,
      endDate,
    );

    // Doanh thu bán hàng
    const revenue = ctbans.reduce(
      (acc, ctban) => acc + ctban.totalProductValue,
      0,
    );
    // Chi phí giảm trừ doanh thu, chiết khấu mua hàng, trả lại hàng...
    const revenueDeduction =
      0 - ctbans.reduce((acc, ctban) => acc + ctban.totalDiscountValue, 0);
    const netRevenue = revenue + revenueDeduction;
    // Chi phí mua hàng, giảm giá mua hàng...
    const goodsCost =
      0 - ctmuas.reduce((acc, ctmua) => acc + ctmua.finalValue, 0);
    const grossProfit = netRevenue + goodsCost;
    // Lãi đầu tư, lãi mua hàng trả chậm, lãi cho vay, lãi gửi ngân hàng
    let financeIncome = 0;
    // Chi phí chiết khấu thanh toán, lãi vay, lãi mua hàng trả chậm
    let financeExpense = 0;
    // Chi phí bán hàng
    let sellingExpense = 0;
    // Chi phí quản lý
    let managementExpense = 0;
    const operatingProfit =
      grossProfit +
      financeIncome +
      financeExpense +
      sellingExpense +
      managementExpense;
    // Thu nhập khác
    let otherIncome = 0;
    // Chi phí khác
    let otherExpense = 0;
    const otherProfit = otherIncome + otherExpense;
    const profitBeforeTax = operatingProfit + otherProfit;
    // Thuế TNDN
    let corporateIncomeTax = 0;
    const profitAfterTax = profitBeforeTax - corporateIncomeTax;

    phieuChiKhacs.forEach((phieuChi) => {
      switch (phieuChi.type) {
        case PHIEU_CHI_TYPE.SALARY_COSTS: // Chi phí lương
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.BONUS_COSTS: // Chi phí thưởng
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.TAX_EXPENSES: // Chi phí thuế: hbxh, bhyt, hải quan...
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.RENT_EXPENSES: // Chi phí thuê mặt bằng
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.MARKETING_EXPENSES: // Chi phí quảng cáo và tiếp thị
          sellingExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.UTILITY_COSTS: // Chi phí tiện ích (điện nước)
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.LOGISTICS_COSTS: // Chi phí vận chuyển cho hoạt động bán hàng
          sellingExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.ADMINISTRATIVE_COSTS: // Chi phí hành chính (văn phòng phẩm)
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.TRAINING_COSTS: // Chi phí đào tạo và phát triển
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.LEGAL_COSTS: // Chi phí tư vấn pháp lý, giấy phép...
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.INSURANCE_COSTS: // Chi phí bảo hiểm
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.DEPRECIATION_COSTS: // Chi phí khấu hao, ko tính trực tiếp vào giá vốn
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.FINANCIAL_COSTS: // Chi phí tài chính (lãi vay, phí ngân hàng, giao dịch...)
          financeExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.RAD_COSTS: // Chi phí nghiên cứu và phát triển
          managementExpense += phieuChi.money;
          break;
        case PHIEU_CHI_TYPE.OTHER_COSTS: // Chi phí khác
          otherExpense += phieuChi.money;
          break;
        default:
          break;
      }
    });

    const detail = {
      revenue,
      revenueDeduction,
      netRevenue,
      goodsCost,
      grossProfit,
      financeIncome,
      financeExpense,
      sellingExpense,
      managementExpense,
      operatingProfit,
      otherIncome,
      otherExpense,
      otherProfit,
      profitBeforeTax,
      corporateIncomeTax,
      profitAfterTax,
    };

    if (isRaw) {
      return {
        ...createReportCostDto,
        ...detail,
      };
    }
    return this.reportCostRepository.create(createReportCostDto, detail);
  }

  findAll() {
    return this.reportCostRepository.findAll();
  }

  async findOne(id: number) {
    const reportCost = await this.reportCostRepository.findOne(id);
    if (!reportCost) {
      throw new NotFoundException(`Report cost #${id} not found`);
    }
    return reportCost;
  }
}
