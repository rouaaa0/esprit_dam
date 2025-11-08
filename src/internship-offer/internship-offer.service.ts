import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InternshipOffer, InternshipOfferDocument } from './schemas/internship-offer.schema';

@Injectable()
export class InternshipOfferService {
  constructor(
    @InjectModel(InternshipOffer.name)
    private internshipModel: Model<InternshipOfferDocument>,
  ) {}

  async create(data: InternshipOffer): Promise<InternshipOffer> {
    const offer = new this.internshipModel(data);
    return offer.save();
  }

  async findAll(): Promise<InternshipOffer[]> {
    return this.internshipModel.find().exec();
  }

  async findOne(id: string): Promise<InternshipOffer | null> {
    return this.internshipModel.findById(id).exec();
  }

  async update(id: string, data: Partial<InternshipOffer>): Promise<InternshipOffer | null> {
    return this.internshipModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<InternshipOffer | null> {
    return this.internshipModel.findByIdAndDelete(id).exec();
  }
}
