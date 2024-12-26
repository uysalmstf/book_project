import { IsString, IsOptional } from 'class-validator';

export class FilterBookDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  category?: string;
}