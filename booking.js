import { EntitySchema } from "typeorm";

export const Booking = new EntitySchema({
    name: "Bookings",
    tableName: "bookings",
    columns: {
        id: {
            primary: true,
            type: "int",
            nullable: true
        },
        car: {
            type: "text"
        },
        driver: {
            type: "text"
        },
        startDate: {
            type: "date",
        },
        startTime: {
            type: "time",
        },
        endTime: {
            type: "time",
        },
        archived: {
            type: "boolean",
            nullable: true
        }
    }
})