import { EntitySchema } from "typeorm";

export const Card = new EntitySchema({
    name: "Card",
    tableName: "card",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        user: {
            type: "text",
            
        },
        startDate: {
            type: "date",
        },
        startTime: {
            type: "time",
        },
        endDate: {
            type: "date",
            nullable: true
        },
        endTime: {
            type: "time",
            nullable: true
        }
    }
})