import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ExerciseEquipment } from "src/exercises/exercise-equipment.model";
import { Exercise } from "src/exercises/exercises.model";

interface EquipmentCreationAttrs {
    name: string;
    image: string;
}

@Table({ tableName: 'equipment' })
export class Equipment extends Model<Equipment, EquipmentCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    description: string;

    @Column({ type: DataType.STRING })
    image: string;

    @BelongsToMany(() => Exercise, () => ExerciseEquipment)
    exercises: Exercise[];

}
