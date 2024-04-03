import {
  decodeItem,
  getItemWeight,
  getDiffInMonths,
  sortInvestorsByPortfolioWeight,
  TransactionTypes,
  TransactionHistoryItem,
} from './index';

describe('main', () => {
  it('ranks investors by total weight', () => {
    const r = sortInvestorsByPortfolioWeight(new Date(), [
      {
        name: 'Bob',
        numberOfShares: 2,
        dateOfPurchase: new Date(2010, 1, 1).toISOString(),
        status: TransactionTypes.REFUND,
      },
      {
        name: 'Alice',
        numberOfShares: 1,
        dateOfPurchase: new Date().toISOString(),
        status: TransactionTypes.PURCHASED,
      },
      {
        name: 'Alice',
        numberOfShares: 2000,
        dateOfPurchase: new Date(2010, 1, 1).toISOString(),
        status: TransactionTypes.PURCHASED,
      },
    ]);
    expect(r).toMatchObject([
      {
        name: 'Alice',
        totalShares: 2001,
        weight: 2501.5
      },
      {
        name: 'Bob',
        totalShares: 2,
        weight: -2,
      },
    ]);
    expect(r).toHaveLength(2);
  });

  it('errors on invalid input', () => {
    expect(() => {
      sortInvestorsByPortfolioWeight(new Date(), [{ sponge: 'bob' }]);
    }).toThrow();
  });
});

describe('per-item functions', () => {
  describe('decodeItem', () => {
    const validEncodedItem = {
      name: 'Test',
      numberOfShares: 12,
      dateOfPurchase: '2023-04-23T16:07:16.229Z',
      status: TransactionTypes.PURCHASED,
    };
    it(`finds ${JSON.stringify(validEncodedItem)} valid and returns a parsed value`, () => {
      const parsedItem = decodeItem(validEncodedItem);
      expect(parsedItem).toMatchSnapshot();
    })

    it.each([
      [{ ...validEncodedItem, name: null }],
      [{ ...validEncodedItem, numberOfShares: '12' }],
      [{ ...validEncodedItem, dateOfPurchase: 'Octuary 40, Flemble' }],
      [{ ...validEncodedItem, status: 'PurChASed' }],
    ])('finds %o invalid', (i) => {
      expect(() => {
        decodeItem(i);
      }).toThrow();
    });

    it.failing('errors on non-ISO item dates', () => {
      expect(() => {
        decodeItem({ ...validEncodedItem, dateOfPurchase: 'October 12, 1972' });
      }).toThrow();
    });
  });

  describe('getItemWeight', () => {
    const validItem: TransactionHistoryItem = {
      name: 'Test',
      numberOfShares: 12,
      dateOfPurchase: new Date(2010, 1, 1).getTime(),
      status: TransactionTypes.PURCHASED,
    };
    it.each([
      [-1, { ...validItem, status: TransactionTypes.REFUND }],
      [0, { ...validItem, status: TransactionTypes.INCOMPLETE }],
      [
        1.5,
        {
          ...validItem,
          status: TransactionTypes.PURCHASED,
          dateOfPurchase: Date.now(),
        },
      ],
      [
        1.25,
        {
          ...validItem,
          status: TransactionTypes.PURCHASED,
          numberOfShares: 1001,
        },
      ],
      [
        1,
        {
          ...validItem,
          status: TransactionTypes.PURCHASED,
          numberOfShares: 1000,
        },
      ],
    ])('gives case %# from the weight table weight %d', (weight, item) => {
      expect(getItemWeight(new Date(), item)).toEqual(weight);
    });
  });

  describe('getDiffInMonths', () => {
    it.each([
      ['past dates', new Date(2013, 4, 3), new Date(2012, 5, 15), 11],
      ['future dates', new Date(1999, 4, 3), new Date(2010, 2, 15), -130],
    ])('handles %s', (_, d1, d2, r) => {
      const diff = getDiffInMonths(d1, d2);
      expect(diff).toEqual(r)
    });

    it.failing('handles BCE dates', () => {
      const r = getDiffInMonths(new Date(-20, 1, 1), new Date(20, 1, 1));
      expect(r).toBe(-480);
    });
  });
});
