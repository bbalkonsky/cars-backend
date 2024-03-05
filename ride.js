import { EntitySchema } from "typeorm";

export const Ride = new EntitySchema({
    name: "Rides",
    tableName: "rides",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        carId: {
            type: "int",
        },
        driver: {
            type: "text",
            
        },
        date: {
            type: "date",
        },
        startTime: {
            type: "time",
            nullable: true
        },
        endTime: {
            type: "time",
            nullable: true
        },
        type: {
            type: "text",
            default: "personal",
        },
        startMileage: {
            type: "text",
            nullable: true
        },
        endMileage: {
            type: "text",
            nullable: true
        },
        comment: {
            type: "text",
            nullable: true
        }
    },
    relations: {
        cars: {
            target: "Cars",
            type: "one-to-many",
            joinTable: true,
            cascade: true,
        },
        users: {
            target: "Users",
            type: "one-to-many",
            joinTable: true,
            cascade: true,
        },
    },
})