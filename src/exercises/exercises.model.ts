import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Equipment } from "src/equipment/equipment.model";
import { ExerciseEquipment } from "./exercise-equipment.model";
import { TrainingExercise } from "src/training/training-exercise.model";
import { Training } from "src/training/training.model";

interface ExerciseCreationAttrs {
    name: string;
}

@Table({ tableName: 'exercises' })
export class Exercise extends Model<Exercise, ExerciseCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    type: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    description: string;

    @Column({ type: DataType.INTEGER })
    duration: number;

    @Column({ type: DataType.STRING })
    image: string;

    @Column({ type: DataType.STRING })
    video: string;

    @Column({ type: DataType.BOOLEAN })
    deleted: boolean;

    @Column({ type: DataType.ARRAY(DataType.TEXT('tiny')) })
    techniques: string[];

    @BelongsToMany(() => Equipment, () => ExerciseEquipment)
    equipment: Equipment[];

    @BelongsToMany(() => Training, () => TrainingExercise)
    trainings: Equipment[];

}
