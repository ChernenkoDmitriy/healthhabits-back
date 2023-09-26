import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";

interface UserPlanCreationAttrs {
    user_id: number;
}

@Table({ tableName: 'user-plan' })
export class UserPlan extends Model<UserPlan, UserPlanCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.INTEGER })
    height: number;

    @Column({ type: DataType.INTEGER })
    weight: number;

    @Column({ type: DataType.INTEGER })
    age: number;

    @Column({ type: DataType.DATE })
    birthday: Date;

    // ---------------------------- About you ----------------------------

    @Column({ type: DataType.ENUM('LOSE_WEIGHT', 'BUILD_MUSCLE', 'IMPROVE_BODY', 'KEEP_FIT'), allowNull: true })
    goal: 'LOSE_WEIGHT' | 'BUILD_MUSCLE' | 'IMPROVE_BODY' | 'KEEP_FIT';

    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
    interests: string[]; // 'MEAL_PLAN', 'CALORIE_CONTROL', 'TRAINING_PLANS'

    @Column({ type: DataType.ENUM('MALE', 'FEMALE', 'OTHER'), allowNull: true })
    gender: 'MALE' | 'FEMALE' | 'OTHER';

    @Column({ type: DataType.ENUM('NONE', 'BACK', 'KNEES', 'WHEELCHAIR'), allowNull: true })
    injuries: 'NONE' | 'BACK' | 'KNEES' | 'WHEELCHAIR';

    @Column({ type: DataType.ARRAY(DataType.STRING) })
    activities: string[]; // 'FITNESS', 'WALKING', 'RUNNING', 'YOGA', 'GYM'

    @Column({ type: DataType.ENUM('ECTOMORPH', 'MESOMORPH', 'ENDOMORPH'), allowNull: true })
    body_type: 'ECTOMORPH' | 'MESOMORPH' | 'ENDOMORPH';

    @Column({ type: DataType.ENUM('EMBOSSED', 'INFLATED', 'VERY_INFLATED'), allowNull: true })
    body_type_goal: 'EMBOSSED' | 'INFLATED' | 'VERY_INFLATED';

    @Column({ type: DataType.STRING })
    average_training_time_week: string; // 1-2, 2-3, 3-4, 4-5, 5-6, 6-7

    @Column({ type: DataType.ENUM('SLOW', 'MEDIUM', 'FAST'), allowNull: true })
    tempo: 'SLOW' | 'MEDIUM' | 'FAST';

    // ---------------------------- Relations ----------------------------

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    user_id: number;

    @BelongsTo(() => User)
    user: User;

}
