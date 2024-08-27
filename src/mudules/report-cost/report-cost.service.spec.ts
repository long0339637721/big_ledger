import { Test, TestingModule } from '@nestjs/testing';
import { ReportCostService } from './report-cost.service';

describe('ReportCostService', () => {
  let service: ReportCostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportCostService],
    }).compile();

    service = module.get<ReportCostService>(ReportCostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
