import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InternshipOfferService } from './internship-offer.service';
import { CreateInternshipOfferDto } from './dto/create-internship-offer.dto';
import { UpdateInternshipOfferDto } from './dto/update-internship-offer.dto';
import { InternshipOffer } from './schemas/internship-offer.schema';


@ApiTags('Internship Offers')
@Controller('internship-offers')
export class InternshipOfferController {
  constructor(private readonly internshipService: InternshipOfferService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle offre de stage' })
  async create(@Body() dto: CreateInternshipOfferDto): Promise<InternshipOffer> {
    // Utiliser le DTO directement (mongoose accepte un objet partiel)
    return this.internshipService.create(dto as InternshipOffer);
  }

  @Get()
  @ApiOperation({ summary: 'Afficher toutes les offres de stage' })
  async findAll(): Promise<InternshipOffer[]> {
    return this.internshipService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Afficher une offre spécifique' })
  async findOne(@Param('id') id: string): Promise<InternshipOffer> {
    const offer = await this.internshipService.findOne(id);
    if (!offer) throw new NotFoundException('Offre non trouvée');
    return offer;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifier une offre existante' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInternshipOfferDto,
  ): Promise<InternshipOffer> {
    const updated = await this.internshipService.update(id, dto);
    if (!updated) throw new NotFoundException('Offre non trouvée');
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une offre de stage' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const deleted = await this.internshipService.delete(id);
    if (!deleted) throw new NotFoundException('Offre non trouvée');
    return { message: 'Offre supprimée avec succès' };
  }
}
