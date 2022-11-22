import { UserEntity } from "nestJS/src/user/user.entity";

export type UserType = Omit<UserEntity, 'hashPassword'>;

