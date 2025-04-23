import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';

describe('QuoteController', () => {
  let controller: QuoteController;
  let service: QuoteService;

  const mockService = {
    findRandomQuote: jest.fn().mockResolvedValue({ id: 1, text: 'Aleatória' }),
    findOne: jest.fn().mockResolvedValue({ id: 1, text: 'Citação 1' }),
    findAll: jest.fn().mockResolvedValue([{ id: 1, text: 'Citação 1' }]),
    update: jest.fn().mockResolvedValue({ status: 'success' }),
    create: jest.fn().mockResolvedValue({ id: 1, text: 'Citação 1' }),
    remove: jest.fn().mockResolvedValue({ status: 'success' }),
    quotesByCategory: jest
      .fn()
      .mockResolvedValue([{ id: 1, text: 'Citação 1' }]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a random quote when id is "random"', async () => {
    const result = await controller.findOne('random');
    expect(result).toEqual({ id: 1, text: 'Aleatória' });
    expect(service.findRandomQuote).toHaveBeenCalled();
  });

  it('should return a quote by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({ id: 1, text: 'Citação 1' });

    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should return all quotes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, text: 'Citação 1' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should update a quote', async () => {
    const result = await controller.update('1', { text: 'Citação 1' });
    expect(result).toEqual({ status: 'success' });
    expect(service.update).toHaveBeenCalled();
  });

  it('should remove a quote', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ status: 'success' });
    expect(service.remove).toHaveBeenCalled();
  });

  it('should return quotes by category', async () => {
    const result = await controller.quotesByCategory('1');
    expect(result).toEqual([{ id: 1, text: 'Citação 1' }]);
    expect(service.quotesByCategory).toHaveBeenCalled();
  });

  it('should return quotes by category', async () => {
    const result = await controller.create({
      text: 'Citação 1',
      categoryId: 1,
    });
    expect(result).toEqual({ id: 1, text: 'Citação 1' });
    expect(service.create).toHaveBeenCalled();
  });
});
