import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Timesheet } from "#/timesheets/entities/timesheet.entity";

@Entity()
export class Report {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', {
    length: 120,
    unique: true
  })
  name: string;

  @ManyToMany(() => Timesheet, (timesheet) => timesheet.Reports)
  @JoinTable()
  Timesheets?: Timesheet[];
}
