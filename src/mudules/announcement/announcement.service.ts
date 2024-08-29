import { Injectable, NotFoundException } from '@nestjs/common';
import { GetAnnouncementDto } from './dto/get-announcement.dto';
import { AnnouncementRepository } from './announcement.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ANNOUNCEMENT_TYPE,
  AnnouncementType,
  DELIVERY_STATUS,
  PAYMENT_STATUS,
} from 'src/constants';
import { CtbanService } from '../ctban/ctban.service';
import { UpdateAnnouncementDto } from './dto/update-annoucement';
import { DonBanHangService } from '../don-ban-hang/don-ban-hang.service';
import { MailerService } from '@nestjs-modules/mailer';
import { EmployeeService } from '../employee/employee.service';

const messageGenerator = (
  type: AnnouncementType,
  id: number,
  leftDate: number,
) => {
  let entity: string;
  switch (type) {
    case ANNOUNCEMENT_TYPE.THU:
      entity = 'Hóa đơn phải thu';
      break;
    case ANNOUNCEMENT_TYPE.CHI:
      entity = 'Hóa đơn phải chi';
      break;
    case ANNOUNCEMENT_TYPE.BAN_HANG:
      entity = 'Đơn bán hàng';
      break;
    case ANNOUNCEMENT_TYPE.MUA_HANG:
      entity = 'Đơn mua hàng';
      break;
    default:
      entity = 'Thông báo';
      break;
  }
  if (leftDate < 0) {
    return `${entity} ${id} đã quá hạn ${-leftDate} ngày.`;
  }
  return `${entity} ${id} sắp đến hạn: còn ${leftDate} ngày.`;
};

@Injectable()
export class AnnouncementService {
  constructor(
    private readonly announcementRepository: AnnouncementRepository,
    private readonly ctbanService: CtbanService,
    private readonly donBanHangService: DonBanHangService,
    private readonly mailerService: MailerService,
    private readonly employeeService: EmployeeService,
  ) {}

  create() {
    return 'This action adds a new announcement';
  }

  findAll(getAnnouncementDto: GetAnnouncementDto) {
    const isRead: boolean[] = [];
    const isResolved: boolean[] = [];
    const type: AnnouncementType[] = [];
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
    if (getAnnouncementDto.type) {
      type.push(getAnnouncementDto.type);
    } else {
      type.push(ANNOUNCEMENT_TYPE.THU);
      type.push(ANNOUNCEMENT_TYPE.CHI);
      type.push(ANNOUNCEMENT_TYPE.BAN_HANG);
      type.push(ANNOUNCEMENT_TYPE.MUA_HANG);
    }
    return this.announcementRepository.findAll(isRead, isResolved, type);
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

  async findByEntity(entityId: number, type: AnnouncementType) {
    const annoucement = await this.announcementRepository.findByEntity(
      entityId,
      type,
    );
    if (!annoucement) {
      throw new NotFoundException(`Annoucement with ${entityId} not found.`);
    }
    return annoucement;
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async checkCtban() {
  //   console.log('Cron job: checkCtban');
  //   const ctban = await this.ctbanService.findByPaymentStatus([
  //     PAYMENT_STATUS.BEING_PAID,
  //     PAYMENT_STATUS.NOT_PAID,
  //   ]);

  //   ctban.forEach(async (ctban) => {
  //     const term = new Date(ctban.paymentTerm);
  //     term.setHours(8, 0, 0, 0);
  //     const now = new Date();
  //     now.setHours(8, 0, 0, 0);
  //     const leftTime = term.getTime() - now.getTime();
  //     const leftDate = leftTime / (1000 * 60 * 60 * 24);

  //     if (leftDate <= 3) {
  //       const annoucement = await this.announcementRepository.findByEntity(
  //         ctban.id,
  //         ANNOUNCEMENT_TYPE.THU,
  //       );
  //       const isRead =
  //         annoucement?.leftDate === leftDate ? annoucement.isRead : false;
  //       const message = messageGenerator(
  //         ANNOUNCEMENT_TYPE.THU,
  //         ctban.id,
  //         leftDate,
  //       );
  //       await this.announcementRepository.create(
  //         message,
  //         ANNOUNCEMENT_TYPE.THU,
  //         ctban.id,
  //         leftDate,
  //         isRead,
  //       );
  //     }
  //   });
  // }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async checkDonBanHang() {
  //   console.log('Cron job: checkDonBanHang');
  //   const donBanHangs = await this.donBanHangService.findByDeliveryStatus([
  //     DELIVERY_STATUS.NOT_DELIVERED,
  //     DELIVERY_STATUS.DELIVERING,
  //   ]);

  //   donBanHangs.forEach(async (donBanHang) => {
  //     const term = new Date(donBanHang.deliveryTerm);
  //     term.setHours(8, 0, 0, 0);
  //     const now = new Date();
  //     now.setHours(8, 0, 0, 0);
  //     const leftTime = term.getTime() - now.getTime();
  //     const leftDate = leftTime / (1000 * 60 * 60 * 24);

  //     if (leftDate <= 3) {
  //       const annoucement = await this.announcementRepository.findByEntity(
  //         donBanHang.id,
  //         ANNOUNCEMENT_TYPE.BAN_HANG,
  //       );
  //       if (!annoucement) {
  //         console.log('Create new announcement');
  //         const message = messageGenerator(
  //           ANNOUNCEMENT_TYPE.BAN_HANG,
  //           donBanHang.id,
  //           leftDate,
  //         );
  //         return this.announcementRepository.create(
  //           message,
  //           ANNOUNCEMENT_TYPE.BAN_HANG,
  //           donBanHang.id,
  //           leftDate,
  //           false,
  //         );
  //       }
  //       if (leftDate !== annoucement.leftDate) {
  //         const message = messageGenerator(
  //           ANNOUNCEMENT_TYPE.BAN_HANG,
  //           donBanHang.id,
  //           leftDate,
  //         );
  //         return this.announcementRepository.updateLeftDate(
  //           annoucement.id,
  //           leftDate,
  //           message,
  //         );
  //       }
  //     }
  //   });
  // }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  // async testMail() {
  //   console.log('Cron job: testMail');
  //   await this.sendEmail(
  //     'long01639637721@gmail.com',
  //     'Test mail',
  //     'Test mail',
  //     '<b>welcome</b>',
  //   );
  //   console.log('Send mail success');
  // }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async checkAnnouncement() {
    console.log('Cron job: checkAnnouncement');
    const announcements = await this.announcementRepository.findAll(
      [false],
      [false],
      [
        ANNOUNCEMENT_TYPE.THU,
        ANNOUNCEMENT_TYPE.CHI,
        ANNOUNCEMENT_TYPE.BAN_HANG,
        ANNOUNCEMENT_TYPE.MUA_HANG,
      ],
    );
    const accountants = await this.employeeService.findAllAccountant();

    announcements.forEach(async (announcement) => {
      const leftDate = announcement.leftDate - 1;
      if (leftDate === 0) {
        for (const accountant of accountants) {
          await this.sendEmail(
            accountant.email,
            'Thông báo',
            announcement.message,
            `<b>${announcement.message}</b>`,
          );
        }
      }
    });
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    await this.mailerService
      .sendMail({
        to: to, // List of receivers email address
        from: 'longdoan.student@gmail.com', // Senders email address
        subject: subject, // Subject line
        text: text, // plaintext body
        html: html, // '<b>welcome</b>',  HTML body content
      })
      .then((success) => {
        console.log('Send mail success');
      })
      .catch((err) => {
        console.log('Send mail fail:', err);
      });
  }

  testMail() {
    console.log('Test mail');
    this.sendEmail(
      'long01639637721@gmail.com',
      'Test mail',
      'Test mail',
      '<b>welcome</b>',
    );
  }
}
