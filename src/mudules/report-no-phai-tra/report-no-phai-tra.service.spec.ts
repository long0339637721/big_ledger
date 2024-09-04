import { Test, TestingModule } from '@nestjs/testing';
import { ReportNoPhaiTraService } from './report-no-phai-tra.service';

describe('ReportNoPhaiTraService', () => {
  let service: ReportNoPhaiTraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportNoPhaiTraService],
    }).compile();

    service = module.get<ReportNoPhaiTraService>(ReportNoPhaiTraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
