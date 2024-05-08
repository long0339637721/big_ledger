import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAnnouncementDto } from './dto/get-announcement.dto';
import { AnnouncementRepository } from './announcement.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ANNOUNCEMENT_TYPE,
  AnnouncementType,
} from 'src/constants/annoucement-type';
import { CtbanService } from '../ctban/ctban.service';
import { PAYMENT_STATUS } from 'src/constants';
import { UpdateAnnouncementDto } from './dto/update-annoucement';
import { floor } from 'lodash';

const messageGenerator = (
  type: AnnouncementType,
  id: number,
  leftDate: number,
) => {
  return `Phiếu ${type} ${id} sắp đến hạn: còn ${leftDate} ngày.`;
};

@Injectable()
export class AnnouncementService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository,
    private readonly ctbanService: CtbanService,
  ) {}

  create() {
    return 'This action adds a new announcement';
  }

  findAll(getAnnouncementDto: GetAnnouncementDto) {
    const isRead: boolean[] = [];
    const isResolved: boolean[] = [];
    if (getAnnouncementDto.isRead) {
      isRead.push(getAnnouncementDto.isRead);
    } else {
      isRead.push(false);
      isRead.push(true);
    }
    if (getAnnouncementDto.isResolved) {
      isResolved.push(getAnnouncementDto.isResolved);
    } else {
      isResolved.push(false);
      isResolved.push(true);
    }
    return this.announcementRepository.findAll(isRead, isResolved);
  }

  async findOne(id: number) {
    const announcement = await this.announcementRepository.findOne(id);
    if (!announcement) {
      throw new NotFoundException(`Annoucement with ${id} not found.`);
    }
    return announcement;
  }

  async update(id: number, updateDto: UpdateAnnouncementDto) {
    const announcement = await this.announcementRepository.findOne(id);
    if (!announcement) {
      throw new NotFoundException(`Annoucement with ${id} not found.`);
    }
    const isRead = updateDto.isRead ?? announcement.isRead;
    const isResolved = updateDto.isResolved ?? announcement.isResolved;
    return this.announcementRepository.update(id, isRead, isResolved);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    console.log('Cron job started');
    const ctban = await this.ctbanService.findByPaymentStatus([
      PAYMENT_STATUS.BEING_PAID,
      PAYMENT_STATUS.NOT_PAID,
    ]);

    ctban.forEach(async (ctban) => {
      const term = new Date(ctban.paymentTerm);
      term.setHours(8, 0, 0, 0);
      const now = new Date();
      now.setHours(8, 0, 0, 0);
      const leftTime = term.getTime() - now.getTime();
      const leftDate = leftTime / (1000 * 60 * 60 * 24);

      if (leftDate <= 3) {
        const message = messageGenerator(
          ANNOUNCEMENT_TYPE.THU,
          ctban.id,
          leftDate,
        );
        await this.announcementRepository.create(
          message,
          ANNOUNCEMENT_TYPE.THU,
          ctban.id,
        );
      }
    });
  }
}