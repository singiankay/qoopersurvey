import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';
import { AuthModule } from 'src/modules/auth/auth.module';
import { FormModule } from 'src/modules/form/form.module';
import { QuestionModule } from 'src/modules/question/question.module';
import { ResponseModule } from 'src/modules/response/response.module';

let app: NestFastifyApplication;
// const catsService = { findAll: () => ['test'] };
describe('Test', () => {
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, FormModule, QuestionModule, ResponseModule],
    })
      // .overrideProvider(CatsService)
      // .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`/GET cats`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/auth/register',
        body: {
          email: '123testing@testing.com',
          password: '12345',
        },
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        // expect(result.payload).toEqual(/* expectedPayload */);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
