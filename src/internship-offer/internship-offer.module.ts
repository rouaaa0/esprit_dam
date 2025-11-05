import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InternshipOfferService } from './internship-offer.service';
import { InternshipOfferController } from './internship-offer.controller';
import { InternshipOffer, InternshipOfferSchema } from './schemas/internship-offer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: InternshipOffer.name, schema: InternshipOfferSchema }]),
  ],
  controllers: [InternshipOfferController],
  providers: [InternshipOfferService],
})
export class InternshipOfferModule {}
