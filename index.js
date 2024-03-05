import Fastify from 'fastify';
import cors from '@fastify/cors'
import { DataSource, MoreThanOrEqual } from 'typeorm';
import { Car } from './car.js'
import { Ride } from './ride.js';
import { User } from './user.js';
import { Card } from './card.js';
import { Booking } from './booking.js';

const fastify = Fastify({
  logger: true
});

fastify.register(cors, {});

const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true,
  entities: [Car, User, Ride, Card, Booking],
});

dataSource
  .initialize()
  .then();

// get all cars
fastify.get('/cars', async (request, reply) => {
  const carsRepository = dataSource.getRepository(Car);
  const allCars = await carsRepository.find({ select: ['id', 'name', 'location', 'status', 'image', 'mileage', 'lastDriver'] });

  const res = allCars.map(c => {
    const b64 = Buffer.from(c.image).toString('base64');
    const mimeType = 'image/jpg';
    return { ...c, image: `data:${mimeType};base64,${b64}` };
  });

  reply.send(res);
});

// get car by id
fastify.get('/cars/:id', async (request, reply) => {
  const { id } = request.params;
  const carsRepository = dataSource.getRepository(Car);
  const car = await carsRepository.findOne({ where: { id } });

  const b64 = Buffer.from(car.image).toString('base64');
  const mimeType = 'image/jpg';

  reply.send({ ...car, image: `data:${mimeType};base64,${b64}` });
});

// start car rent by car id
fastify.post('/cars/start/:id', async (request, reply) => {
  const dateTime = new Date;
  const { id } = request.params;
  const { driver } = request.body;

  const carsRepository = dataSource.getRepository(Car);
  const car = await carsRepository.findOne({ where: { id } });

  const rideRepository = dataSource.getRepository("Rides");
  await rideRepository.save({
    driver: driver,
    carId: id,
    date: dateTime,
    startTime: dateTime,
    startMileage: car.mileage
  });

  await carsRepository.save({ ...car, status: false, lastDriver: driver });

  reply.send(200);
});

// finish car rent by car id
fastify.post('/cars/finish/:id', async (request, reply) => {
  const dateTime = new Date;
  const { id } = request.params;
  const { driver, mileage, gas, reason, comment } = request.body;

  const rideRepository = dataSource.getRepository("Rides");
  const lastUserRide = await rideRepository.findOne({ where: { driver, carId: id }, order: { id: 'DESC' } });

  await rideRepository.save({ ...lastUserRide, endTime: dateTime, endMileage: mileage, comment, type: reason });

  const carsRepository = dataSource.getRepository(Car);
  const car = await carsRepository.findOne({ where: { id } });
  await carsRepository.save({ ...car, status: true, mileage });

  reply.send(200);
});

// get card status
fastify.get('/card', async (request, reply) => {
  const cardRepository = dataSource.getRepository("Card");
  const lastCardUsage = await cardRepository.findOne({ where: {}, order: { id: 'DESC' } });

  reply.send(lastCardUsage);
});

// start card rent
fastify.post('/card/start', async (request, reply) => {
  const dateTime = new Date;
  const { user } = request.body;

  const cardRepository = dataSource.getRepository("Card");
  await cardRepository.save({
    user,
    startDate: dateTime,
    startTime: dateTime
  });

  reply.send(200);
});

// finish card rent
fastify.post('/card/finish', async (request, reply) => {
  const dateTime = new Date;

  const cardRepository = dataSource.getRepository("Card");
  const lastCardUsage = await cardRepository.findOne({ where: {}, order: { id: 'DESC' } });
  await cardRepository.save({
    ...lastCardUsage,
    endDate: dateTime,
    endTime: dateTime
  });

  reply.send(200);
});

// get active bookings by car id
fastify.get('/cars/book/:id', async (request, reply) => {
  const dateTime = new Date;
  const { id } = request.params;

  const bookRepository = dataSource.getRepository(Booking);
  const bookings = await bookRepository.find({ where: { car: id, startDate: MoreThanOrEqual(dateTime), archived: false } });

  reply.send(bookings);
});

// need to create endpoint to book car

//archive booking by id
fastify.post('/cars/book/remove/:id', async (request, reply) => {
  const { id } = request.params;

  const bookRepository = dataSource.getRepository(Booking);
  const booking = await bookRepository.findOne({ where: { id } });
  console.log(888, booking)

  await bookRepository.save({ ...booking, archived: true });

  reply.send(200);
});

fastify.listen({ port: 3030 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
});