import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker';

describe('Integration Tests (e2e)', () => {
  let app: INestApplication;
  let access_token = 'Bearer ';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Authorization', () => {
    const email = faker.internet.email();
    const payload = {
      email,
      password: '12345',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      role: 'User',
    };
    describe('Creating Users', () => {
      it('Register successfully', async () => {
        await request(app.getHttpServer())
          .post('/auth/register')
          .send(payload)
          .expect(201);
      });

      it('Same email registration fails', async () => {
        await request(app.getHttpServer())
          .post('/auth/register')
          .send(payload)
          .expect(400)
          .then((response) => {
            expect(response.body.message).toEqual('Email already exists!');
          });
      });
    });

    describe('Logging in', () => {
      it('Log in with wrong password fails', async () => {
        const payload = {
          email,
          password: 'WrongPassword',
        };

        await request(app.getHttpServer())
          .post('/auth/login')
          .send(payload)
          .expect(400)
          .then((response) => {
            expect(response.body.message).toEqual('Invalid Password');
          });
      });

      it('Log in with wrong email fails', async () => {
        const payload = {
          email: faker.internet.email(),
          password: '12345',
        };

        await request(app.getHttpServer())
          .post('/auth/login')
          .send(payload)
          .expect(400)
          .then((response) => {
            expect(response.body.message).toEqual('Email not found.');
          });
      });

      it('Successfully logs in', async () => {
        const payload = {
          email,
          password: '12345',
        };

        await request(app.getHttpServer())
          .post('/auth/login')
          .send(payload)
          .expect(201)
          .then((response) => {
            expect(response.body).toHaveProperty('access_token');

            // set access_token for next test
            access_token += response.body.access_token;
          });
      });
    });

    describe('Accessing Form endpoints', () => {
      it('GET /form endpoint wuthout correct headers fails', async () => {
        await request(app.getHttpServer())
          .post('/form')
          .expect(403)
          .then((response) => {
            expect(response.body.message).toEqual('Forbidden resource');
          });
      });

      it('GET /form endpoint wuthout correct headers succeeds', async () => {
        console.log('access token', access_token);
        await request(app.getHttpServer())
          .get('/form')
          .set('Authorization', access_token)
          .expect(200);
      });
    });
  });
});
