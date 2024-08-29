import { Test, TestingModule } from '@nestjs/testing';
import { ReportCpmhService } from './report-cpmh.service';

describe('ReportCpmhService', () => {
  let service: ReportCpmhService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportCpmhService],
    }).compile();

    service = module.get<ReportCpmhService>(ReportCpmhService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
