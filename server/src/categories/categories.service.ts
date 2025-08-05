import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RelatedEntityService } from '#/shared/services/related-entity.service';
import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService extends RelatedEntityService<Category, UpdateCategoryDto> {
  constructor(source: DataSource) {
    super(source, Category);
  }

  create(dto: CreateCategoryDto) {
    const category = new Category();

    category.name = dto.name;

    return this.repo.save(category);
  }
}
