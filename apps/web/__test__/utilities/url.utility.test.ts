import { buildUrl, buildUrlQuery } from '../../src/utilities/url.utility';

describe('url.utility', () => {
  describe('buildUrlQuery', () => {
    it('should serialize booleans', () => {
      const query = {
        test: false,
      };
      const expected = 'test=false';

      const result = buildUrlQuery(query);

      expect(result).toBe(expected);
    });

    it('should serialize numbers', () => {
      const query = {
        test: 1_234_567,
      };
      const expected = 'test=1234567';

      const result = buildUrlQuery(query);

      expect(result).toBe(expected);
    });

    it('should serialize strings', () => {
      const query = {
        test: 'Hello world!',
      };
      const expected = 'test=Hello%20world!';

      const result = buildUrlQuery(query);

      expect(result).toBe(expected);
    });

    it('should serialize dictionaries', () => {
      const query = {
        test: {
          hello: 'world',
          world: 'hello',
        },
      };
      const expected = "test%5B'hello'%5D=world&test%5B'world'%5D=hello";

      const result = buildUrlQuery(query);

      expect(result).toBe(expected);
    });

    it('should serialize arrays', () => {
      const query = {
        test: ['hello', 'world'],
      };
      const expected = 'test%5B%5D=hello&test%5B%5D=world';

      const result = buildUrlQuery(query);

      expect(result).toBe(expected);
    });

    it('should serialize complex objects', () => {
      const query = {
        test: {
          dict: {
            hello: 'world',
            world: 'hello',
          },
          array: ['hello', 'world'],
        },
      };
      const expected =
        "test%5B'dict'%5D%5B'hello'%5D=world&test%5B'dict'%5D%5B'world'%5D=hello&test%5B'array'%5D%5B%5D=hello&test%5B'array'%5D%5B%5D=world";

      const result = buildUrlQuery(query);

      expect(result).toBe(expected);
    });
  });

  describe('buildUrl', () => {
    it('should join baseUrl and endpoint', () => {
      const baseUrl = 'baseUrl';
      const endpoint = 'endpoint';
      const expected = 'baseUrl/endpoint';

      const result = buildUrl(baseUrl, endpoint);

      expect(result).toBe(expected);
    });

    it('should handle trailing slashes', () => {
      const baseUrl = 'baseUrl/';
      const endpoint = '/endpoint';

      const expected = 'baseUrl/endpoint';

      const result = buildUrl(baseUrl, endpoint);

      expect(result).toBe(expected);
    });

    it('should serialize parameters', () => {
      const baseUrl = 'baseUrl/';
      const endpoint = '/endpoint';
      const parameters = {
        boolean: true,
        number: 0,
        string: 'hello world!',
        dictionary: {
          hello: 'world',
        },
        array: ['hello', 'world'],
      };

      const expected =
        "baseUrl/endpoint?boolean=true&number=0&string=hello%20world!&dictionary%5B'hello'%5D=world&array%5B%5D=hello&array%5B%5D=world";

      const result = buildUrl(baseUrl, endpoint, parameters);

      expect(result).toBe(expected);
    });
  });
});
