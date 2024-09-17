import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportCostDto } from './dto/create-report-cost.dto';
import { UpdateReportCostDto } from './dto/update-report-cost.dto';
import { ReportCostRepository } from './report-cost.repository';
import { CtmuaService } from '../ctmua/ctmua.service';
import { EmployeeService } from '../employee/employee.service';
import { CtbanService } from '../ctban/ctban.service';
import { PhieuChiService } from '../phieu-chi/phieu-chi.service';

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
    const phieuChiKhacs = await this.phieuChiService.findByDate(
      startDate,
      endDate,
      'khac',
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
    const financeIncome = 0;
    // Chi phí chiết khấu thanh toán, lãi vay, lãi mua hàng trả chậm
    const financeExpense = 0;
    // Chi phí bán hàng
    const sellingExpense = 0;
    // Chi phí quản lý
    const managementExpense = 0;
    const operatingProfit =
      grossProfit +
      financeIncome +
      financeExpense +
      sellingExpense +
      managementExpense;
    // Thu nhập khác
    const otherIncome = 0;
    // Chi phí khác
    const otherExpense = 0;
    const otherProfit = otherIncome + otherExpense;
    const profitBeforeTax = operatingProfit + otherProfit;
    // Thuế TNDN
    const corporateIncomeTax = 0;
    const profitAfterTax = profitBeforeTax - corporateIncomeTax;

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
