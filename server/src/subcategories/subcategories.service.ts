import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { RelatedEntityService } from '#/shared/services/related-entity.service';
import { Subcategory } from './entities/subcategory.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class SubcategoriesService extends RelatedEntityService<Subcategory, UpdateSubcategoryDto> {
  constructor(source: DataSource) {
    super(source, Subcategory);
  }

  create(dto: CreateSubcategoryDto) {
    const subcategory = new Subcategory();

    subcategory.name = dto.name;

    return this.repo.save(subcategory);
  }
}
