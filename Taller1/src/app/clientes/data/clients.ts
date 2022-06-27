import { faker } from '@faker-js/faker';
import { Cliente } from '../interfaces/Cliente';

export const clientes: Cliente[] = Array.from({ length: 5 }, (_, i) => ({
  cedula: faker.random.numeric(10, { allowLeadingZeros: true }),
  nombres: faker.name.firstName(),
  apellidos: faker.name.lastName(),
  direccion: faker.address.streetAddress(),
  edad: +faker.random.numeric(2),
}));
