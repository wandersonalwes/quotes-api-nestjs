import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';

describe('QuoteService', () => {
  let service: QuoteService;

  const mockQuoteRepository = {
    find: jest.fn().mockResolvedValue([{ id: 1, text: 'Frase teste' }]),
    create: jest.fn().mockReturnValue({
      id: 1,
      text: 'Nova citação',
      category: { id: 1 },
    }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, text: 'Frase teste' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: QuoteService,
          useValue: mockQuoteRepository,
        },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a quote', async () => {
    const dto = { text: 'Nova citação', categoryId: 1 };
    const savedQuote = {
      id: 1,
      text: dto.text,
      category: { id: dto.categoryId },
    };

    const result = await service.create(dto);

    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(savedQuote);
  });

  it('should return an array of quotes', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1, text: 'Frase teste' }]);
  });
});
