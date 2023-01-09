import { UserDto } from "./UserDto";

export class Category {
    id!: number;;
    title!: string;
    description!: string;
    user! : UserDto;
}