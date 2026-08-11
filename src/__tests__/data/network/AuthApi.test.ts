import { AxiosError, AxiosHeaders, type AxiosResponse } from 'axios';
import { BaseTest } from '../../BaseTest';
import { test } from '../../TestFunctions';
import { AuthApiImpl } from '../../../data/network/AuthApi';
import { httpClient } from '../../../data/network/httpClient';
import { ApiException } from '../../../domain/exceptions/BaseException';

jest.mock('../../../data/network/httpClient', () => ({
  httpClient: { delete: jest.fn() },
}));

const mockDelete = httpClient.delete as jest.Mock;

function responseWithStatus(status: number): AxiosError {
  const response = {
    data: {},
    status,
    statusText: '',
    headers: new AxiosHeaders(),
    config: { headers: new AxiosHeaders() },
  } satisfies AxiosResponse;
  return new AxiosError(`Request failed with status code ${status}`, 'ERR_BAD_REQUEST', undefined, undefined, response);
}

class AuthApiImplTest extends BaseTest<AuthApiImpl> {
  classUnderTest!: AuthApiImpl;

  beforeEach() {
    mockDelete.mockReset();
    mockDelete.mockResolvedValue({ status: 204 });
    this.classUnderTest = new AuthApiImpl();
  }
}

describe('AuthApiImpl', () => {
  const t = new AuthApiImplTest();
  beforeEach(() => t.setup());

  describe('deleteAccount', () => {
    it('asks the server to delete the signed-in account', async () => {
      await test({
        whenAction: () => t.classUnderTest.deleteAccount(),
        then: () => expect(mockDelete).toHaveBeenCalledWith('/users/me'),
      });
    });

    it('reports a not found, which means the route is missing rather than the account', async () => {
      mockDelete.mockRejectedValue(responseWithStatus(404));

      await expect(t.classUnderTest.deleteAccount()).rejects.toBeInstanceOf(ApiException);
    });

    it('reports a server failure', async () => {
      mockDelete.mockRejectedValue(responseWithStatus(500));

      await expect(t.classUnderTest.deleteAccount()).rejects.toBeInstanceOf(ApiException);
    });
  });
});
