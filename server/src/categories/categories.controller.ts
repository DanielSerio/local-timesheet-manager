import { Controller, Post, Body, } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { RelatedEntityController } from '#/shared/controllers/related-entity.controller';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController extends RelatedEntityController<Category, UpdateCategoryDto, CategoriesService> {
  constructor(categoriesService: CategoriesService) {
    super(categoriesService);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.service.create(createCategoryDto);
  }
}
