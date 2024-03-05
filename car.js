import { EntitySchema } from "typeorm";

export const Car = new EntitySchema({
    name: "Cars",
    tableName: "cars",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "text"
        },
        location: {
            type: "text"
        },
        status: {
            type: "boolean"
        },
        image: {
            type: "blob"
        },
        mileage: {
            type: "text",
            nullable: true
        },
        lastDriver: {
            type: "text",
            nullable: true
        },
        gas: {
            type: "text",
            nullable: true
        }
    }
})