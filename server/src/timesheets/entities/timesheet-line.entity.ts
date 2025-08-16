import { TimesheetLineRecord } from "#/shared/types/models/timesheet-line.types";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Timesheet } from "./timesheet.entity";
import { Category } from "#/categories/entities/category.entity";
import { Subcategory } from "#/subcategories/entities/subcategory.entity";

@Entity()
export class TimesheetLine implements TimesheetLineRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int')
  timesheetId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @Column('int')
  categoryId: number;

  @Column('int', { nullable: true })
  subcategoryId: number | null;

  @Column('char', { length: 5 })
  startTime: string;

  @Column('char', { length: 5 })
  endTime: string;

  @Column('varchar', { length: 200 })
  note: string | null;

  @ManyToOne(() => Timesheet)
  @JoinColumn({
    name: 'timesheetId',
    referencedColumnName: 'id'
  })
  Timesheet?: Timesheet;

  @ManyToOne(() => Category)
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id'
  })
  Category?: Category;

  @ManyToOne(() => Subcategory)
  @JoinColumn({
    name: 'subcategoryId',
    referencedColumnName: 'id'
  })
  Subcategory?: Subcategory;
}