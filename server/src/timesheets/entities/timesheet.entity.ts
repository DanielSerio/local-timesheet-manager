import { TimesheetRecord } from "#/shared/types/models/timesheet.types";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TimesheetLine } from "./timesheet-line.entity";

@Entity()
export class Timesheet implements TimesheetRecord {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastUpdateAt: Date;

  @Column('date')
  date: Date;

  @Column('varchar', { unique: true })
  name: string;

  @OneToMany(() => TimesheetLine, (line) => line.Timesheet)
  Lines?: TimesheetLine[];
}
