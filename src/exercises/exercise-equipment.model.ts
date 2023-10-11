import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Exercise } from "./exercises.model";
import { Equipment } from "src/equipment/equipment.model";

interface ExerciseEquipmentCreationAttrs {
    exercise_id: number;
    equipment_id: number;
}

@Table({ tableName: 'exercise_equipment' })
export class ExerciseEquipment extends Model<ExerciseEquipment, ExerciseEquipmentCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Exercise)
    @Column({ type: DataType.INTEGER })
    exercise_id: number;

    @ForeignKey(() => Equipment)
    @Column({ type: DataType.INTEGER })
    equipment_id: number;
    
    @BelongsTo(() => Exercise)
    exercise: Exercise;

    @BelongsTo(() => Equipment)
    equipment: Equipment;

}
