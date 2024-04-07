
import { faker } from '@faker-js/faker';


export function createRandomUser( expenses ) {

  return {
    profile: faker.image.avatar(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number({ min: 1, max: 40 }), // Adjusting age range
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    date: faker.date.between('2020-01-01', '2030-01-01').toISOString(),
  };
}

export const USERS = Array.from({ length: 30 }, createRandomUser);
