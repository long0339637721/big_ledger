import { Test, TestingModule } from '@nestjs/testing';
import { PhieuChiTienMatController } from './phieu-chi.controller';
import { PhieuChiService } from './phieu-chi.service';

describe('PhieuChiController', () => {
  let controller: PhieuChiTienMatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhieuChiTienMatController],
      providers: [PhieuChiService],
    }).compile();

    controller = module.get<PhieuChiTienMatController>(
      PhieuChiTienMatController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
