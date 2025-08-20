import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './subcategories/subcategories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories/entities/category.entity';
import { Subcategory } from './subcategories/entities/subcategory.entity';
import { CollectionsModule } from './collections/collections.module';
import { TimesheetsModule } from './timesheets/timesheets.module';
import { TimesheetLine } from './timesheets/entities/timesheet-line.entity';
import { Timesheet } from './timesheets/entities/timesheet.entity';
import { ReportsModule } from './reports/reports.module';
import { Report } from './reports/entities/report.entity';
import { InitialDataSeeding1755610121776 } from './migrations/1755610121776-InitialDataSeeding';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'better-sqlite3',
        database: configService.get('DATABASE'),
        entities: [
          Category,
          Subcategory,
          TimesheetLine,
          Timesheet,
          Report
        ],
        migrations: [
          InitialDataSeeding1755610121776
        ],
        migrationsRun: true
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    SubcategoriesModule,
    CollectionsModule,
    TimesheetsModule,
    ReportsModule
  ]
})
export class AppModule { }
