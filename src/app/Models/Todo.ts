import { Category } from "./Category";

export class Todo {
    id!: number;
    title!: string;
    description!: string;
    category!: Category;
    favorite!: boolean;
    done!: boolean;
    creationDate! : Date;
}