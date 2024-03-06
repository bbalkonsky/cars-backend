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
        // startDate: {
        //     type: "date",
        //     nullable: true
        // },
        startTime: {
            type: "time",
            nullable: true
        },
        endTime: {
            type: "time",
            nullable: true
        },
        startDatetime: {
            type: "datetime"
        },
        // endDatetime: {
        //     type: "datetime",
        //     nullable: true
        // },
        archived: {
            type: "boolean",
            nullable: true
        }
    }
})