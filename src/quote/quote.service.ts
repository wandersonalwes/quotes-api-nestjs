import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
  ) {}

  create({ text, categoryId }: CreateQuoteDto) {
    const quote = this.quoteRepository.create({
      text,
      category: { id: categoryId },
    });
    return this.quoteRepository.save(quote);
  }

  findAll() {
    return this.quoteRepository.find({
      relations: ['category'],
    });
  }

  findOne(id: number) {
    return this.quoteRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  update(id: number, { categoryId, text }: UpdateQuoteDto) {
    return this.quoteRepository.update(id, {
      text,
      category: { id: categoryId },
    });
  }

  remove(id: number) {
    return this.quoteRepository.delete(id);
  }

  quotesByCategory(categoryId: number) {
    return this.quoteRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  findRandomQuote() {
    return this.quoteRepository
      .createQueryBuilder('quote')
      .orderBy('RANDOM()')
      .limit(1)
      .getOne();
  }
}
