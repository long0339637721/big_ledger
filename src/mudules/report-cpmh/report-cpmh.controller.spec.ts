import { Test, TestingModule } from '@nestjs/testing';
import { ReportCpmhController } from './report-cpmh.controller';
import { ReportCpmhService } from './report-cpmh.service';

describe('ReportCpmhController', () => {
  let controller: ReportCpmhController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportCpmhController],
      providers: [ReportCpmhService],
    }).compile();

    controller = module.get<ReportCpmhController>(ReportCpmhController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
