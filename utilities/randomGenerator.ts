import { faker } from '@faker-js/faker';

export class RandomGenerator {
    /**
     * Generates a random email address.
     * @returns A random email address.
     */
    generateRandomData(dataType: string): string {
        const temp: string = ''
        const firstName: string = faker.person.firstName()
        const lastName: string = faker.person.lastName();
        const email: string = faker.internet.email();
        const phone: string = faker.phone.number();
        const company: string = faker.company.name()
        const country: string = faker.location.country()
        const message: string = faker.lorem.sentence();

        // Map data types to corresponding values
        const dataMap: { [key: string]: string } = {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'phone': phone,
            'company': company,
            'country': country,
            'message': message
        };

        // Return the value based on the dataType argument
        return dataMap[dataType];
    }
}