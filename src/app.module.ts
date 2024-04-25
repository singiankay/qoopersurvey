import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { FormModule } from './modules/form/form.module';

@Module({
  imports: [AuthModule, FormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
