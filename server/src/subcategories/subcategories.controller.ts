import { Controller, Post, Body, } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { RelatedEntityController } from '#/shared/controllers/related-entity.controller';
import { Subcategory } from './entities/subcategory.entity';

@Controller('subcategories')
export class SubcategoriesController extends RelatedEntityController<Subcategory, UpdateSubcategoryDto, SubcategoriesService> {
  constructor(subcategoriesService: SubcategoriesService) {
    super(subcategoriesService);
  }

  @Post()
  create(@Body() createSubcategoryDto: CreateSubcategoryDto) {
    return this.service.create(createSubcategoryDto);
  }
}
