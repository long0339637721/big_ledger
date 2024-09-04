import { Test, TestingModule } from '@nestjs/testing';
import { ReportNoPhaiTraController } from './report-no-phai-tra.controller';
import { ReportNoPhaiTraService } from './report-no-phai-tra.service';

describe('ReportNoPhaiTraController', () => {
  let controller: ReportNoPhaiTraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportNoPhaiTraController],
      providers: [ReportNoPhaiTraService],
    }).compile();

    controller = module.get<ReportNoPhaiTraController>(ReportNoPhaiTraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
