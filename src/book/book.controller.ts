import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dtos/createBook.dto";
import { UpdateBookDto } from "./dtos/updateBook.dto";
import { ObjectId } from "mongodb";
import { FilterBookDto } from "./dtos/filterBook.dto";
import { GivePointDto } from "./dtos/givePoint.dto";

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  getBooks() {
    return this.bookService.getAllBooks();
  }

  @Post()
  saveBook(@Body() createBookDto: CreateBookDto){
    return this.bookService.saveBook(createBookDto);
  }

  @Get(':id')
  getBook(@Param('id') id: string) {
    const bookId = new ObjectId(id);
    return this.bookService.getBookById(bookId);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    const bookId = new ObjectId(id);
    return this.bookService.deleteBook(bookId);
  }

  @Put(':id')
  updateBook(@Param('id') id: string,@Body() updateBookDto: UpdateBookDto){
    const bookId = new ObjectId(id);
    return this.bookService.updateBook(updateBookDto, bookId);
  }

  @Post('filter')
  async findByFilter(@Body() filterDto: FilterBookDto) {
    return this.bookService.findByFilter(filterDto);
  }

  @Post('giveBookPoint')
  async giveBookPoint(@Body() givePointDto: GivePointDto) {
    const bookId = new ObjectId(givePointDto.id);
    return this.bookService.givePointBook(bookId, givePointDto.point);
  }

  @Get(':order')
  orderBook(@Param('order') order: string) {
    return this.bookService.orderBook(order);
  }
}