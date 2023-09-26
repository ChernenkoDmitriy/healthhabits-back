import { BelongsTo, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserPlan } from "src/user-plan/user-plan.model";

interface UserCreationAttrs {
    first_name: string;
    last_name: string;
    phone: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs>{

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING })
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    phone: string;

    @Column({ type: DataType.STRING })
    first_name: string;

    @Column({ type: DataType.STRING })
    last_name: string;

    @Column({ type: DataType.STRING })
    avatar: string;

    @Column({ type: DataType.STRING })
    password: string;

    @BelongsTo(() => UserPlan, { foreignKey: 'user_id', onDelete: 'CASCADE' })
    user_plan: UserPlan;

}
