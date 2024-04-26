import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { FormModule } from './modules/form/form.module';
import { QuestionModule } from './modules/question/question.module';
import { ResponseModule } from './modules/response/response.module';

@Module({
  imports: [AuthModule, FormModule, QuestionModule, ResponseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
