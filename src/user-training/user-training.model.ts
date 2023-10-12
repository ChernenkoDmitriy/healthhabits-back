import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { Training } from '../training/training.model';

@Table({
    tableName: 'user_training', createdAt: false, updatedAt: false, indexes: [
        {
            name: 'UNIQUE_CONSTRAINT_PAIR',
            unique: true,
            fields: ['user_id', 'training_id']
        },
    ]
})
export class UserTraining extends Model<UserTraining> {

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    user_id: number;

    @ForeignKey(() => Training)
    @Column({ type: DataType.INTEGER })
    training_id: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Training)
    training: Training;

}