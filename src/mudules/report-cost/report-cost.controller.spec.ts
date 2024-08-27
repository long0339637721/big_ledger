import { Test, TestingModule } from '@nestjs/testing';
import { ReportCostController } from './report-cost.controller';
import { ReportCostService } from './report-cost.service';

describe('ReportCostController', () => {
  let controller: ReportCostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportCostController],
      providers: [ReportCostService],
    }).compile();

    controller = module.get<ReportCostController>(ReportCostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
