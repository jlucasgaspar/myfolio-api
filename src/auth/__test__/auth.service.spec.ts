import { BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryMock } from '@/user/__mocks__/user.repository.mock';
import { AuthService } from '../auth.service';

describe(AuthService.name, () => {
  let sut: AuthService;
  const userRepositoryMock = new UserRepositoryMock();
  const jwtService = new JwtService();

  beforeAll(() => {
    jest.spyOn(jwtService, 'sign').mockImplementation(() => 'jwt_token');
  });

  beforeEach(() => {
    userRepositoryMock.resetDatabase();
    sut = new AuthService(jwtService, userRepositoryMock);
  });

  describe('login', () => {
    it('should throw if e-mail is not found', async () => {
      const response = sut.login({
        email: 'test@gmail.com',
        password: '123456',
      });
      expect(response).rejects.toThrow(NotFoundException);
    });

    it('should return user and token in success', async () => {
      const loginUser = {
        email: 'ok@gmail.com',
        password: '123',
        phone: '123',
      };
      await userRepositoryMock.insert(loginUser);
      const response = await sut.login(loginUser);
      expect(response.user.email).toEqual(loginUser.email);
      expect(response.token).toBeTruthy();
    });
  });

  describe('signUp', () => {
    it('should throw if e-mail already exists', async () => {
      const signUpUser = {
        email: 'new_user@gmail.com',
        password: '123',
        phone: '123',
      };
      await userRepositoryMock.insert(signUpUser);
      const response = sut.signUp(signUpUser);
      expect(response).rejects.toThrow(BadRequestException);
    });

    it('should return user and token in success', async () => {
      const newUser = {
        email: 'new_user@gmail.com',
        password: '123',
        phone: '123',
      };
      const response = await sut.signUp(newUser);
      expect(response.user.email).toEqual(newUser.email);
      expect(response.token).toBeTruthy();
    });
  });

  describe('refreshToken', () => {
    it('should throw if the parameter is not a bearer token', async () => {
      const result = sut.refreshToken({ oldToken: 'wrong_token' });
      expect(result).rejects.toThrow(NotFoundException);
    });

    it('should throw if the provided token does not refer to an user', async () => {
      jest.spyOn(jwtService, 'decode').mockImplementationOnce(() => ({
        sub: 'wrong_user_id',
      }));
      const result = sut.refreshToken({ oldToken: 'Bearer ey...' });
      expect(result).rejects.toThrow(NotFoundException);
    });

    it('return a new token if everything is ok', async () => {
      const signUpResult = await sut.signUp({
        email: 'user@gmail.com',
        password: '123123',
        phone: '123',
      });
      jest.spyOn(jwtService, 'decode').mockImplementationOnce(() => ({
        sub: signUpResult.user._id,
      }));
      const result = await sut.refreshToken({ oldToken: 'Bearer ey...' });
      expect(result.token).toBeTruthy();
      expect(result.user).toBeTruthy();
    });
  });
});
