import { Book } from "../schemas/book.schema";
import { Injectable, HttpException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateBookDto } from "./dtos/createBook.dto";
import { UpdateBookDto } from "./dtos/updateBook.dto";
import { ObjectId } from 'mongodb';
import { filter } from "rxjs";
import { FilterBookDto } from "./dtos/filterBook.dto";
@Injectable()
export class BookService {

  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find({
      where: {
        deletedAt: null
      }
    });
  }

  async saveBook(createBookDto: CreateBookDto){
    const newBook = this.bookRepository.create(
      {
        name: createBookDto.name,
        category: createBookDto.category,
        author: createBookDto.author,
        publish_year: createBookDto.publish_year,
        createdAt: new Date().toISOString(),
        deletedAt: null
      });

    await this.bookRepository.save(newBook);

    return newBook;

  }

  async getBookById(id: ObjectId) {

    const book = await this.bookRepository.findOne({ where: { _id: id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async updateBook(updateBookDto: UpdateBookDto, id: ObjectId){
    const book = await this.bookRepository.findOne({ where: { _id: id, deletedAt: null } });

    if (!book) throw new HttpException('Book Not Found', 404);

    Object.assign(book, updateBookDto);
    return this.bookRepository.save(book);
  }

  async deleteBook(id: ObjectId) {
    const book = await this.bookRepository.findOne({ where: { _id: id, deletedAt: null } });

    if (!book) throw new HttpException('Book Not Found', 404);

    book.deletedAt = new Date();

    return await this.bookRepository.save(book);
  }

  async findByFilter(filterDto: FilterBookDto): Promise<Book[]> {
    return this.bookRepository.find({
      where: filterDto,
    });
  }

  async orderBook(order: string): Promise<Book[]> {

    const ord = (order == "ASC") ? 1 : -1;
    return await this.bookRepository.find({
      where: {
        deletedAt: null
      },
      order: {
        point: ord
      }
    });
  }

  async givePointBook(id: ObjectId, point: number) {

    const book = await this.bookRepository.findOne({ where: { _id: id, deletedAt: null } });

    if (!book) throw new HttpException('Book Not Found', 404);

    book.point += point;

    return await this.bookRepository.save(book);
  }

}