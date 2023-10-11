import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Exercise } from "src/exercises/exercises.model";
import { TrainingExercise } from "./training-exercise.model";

interface TrainingCreationAttrs {
    name: string;
}

@Table({ tableName: 'trainings' })
export class Training extends Model<Training, TrainingCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    description: string;

    @Column({ type: DataType.STRING })
    image: string;

    @Column({ type: DataType.BOOLEAN })
    deleted: boolean;

    @BelongsToMany(() => Exercise, () => TrainingExercise)
    exercises: Exercise[];

}
