import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
    name: "Users",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            nullable: true
        },
        name: {
            type: "text",
            nullable: true
        }
    }
})