import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Training } from "./training.model";
import { Exercise } from "src/exercises/exercises.model";
import { User } from "src/user/user.model";

interface TrainingExerciseCreationAttrs {
    exercise_id: number;
    training_id: number;
}

@Table({ tableName: 'training_exercise' })
export class TrainingExercise extends Model<TrainingExercise, TrainingExerciseCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Exercise)
    @Column({ type: DataType.INTEGER })
    exercise_id: number;

    @ForeignKey(() => Training)
    @Column({ type: DataType.INTEGER })
    training_id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    user_id: number;

    @Column({ type: DataType.INTEGER })
    order: number;

    @Column({ type: DataType.INTEGER })
    repeats: number;

    @BelongsTo(() => Exercise)
    exercise: Exercise;

    @BelongsTo(() => Training)
    training: Training;

}
