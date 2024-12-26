import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "../schemas/book.schema";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Book])
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}