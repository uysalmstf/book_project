import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from "./book/book.module";
import { Book } from "./schemas/book.schema";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://uysalmstf:Mu__77110804@cluster0.t2vcm.mongodb.net/keysop',
      database: 'keysop',
      useUnifiedTopology: true,
      entities: [Book],
      synchronize: true,
    }),
    BookModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
