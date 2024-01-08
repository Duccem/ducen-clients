import { UuidMother } from "core";
import { JWTAuthService } from "../../../src/Member/infrastructure/JWTAuthService";
import { MemberMother } from "../domain/MemberMother";

describe('JWTAuthService', () => {
  let service: JWTAuthService;

  beforeEach(() => {
    service = new JWTAuthService(UuidMother.random());
  });

  it('should generate a token', () => {
    const token = service.generateToken(MemberMother.create());
    expect(token).not.toBeNull();
  });

  it('should decode a token', () => {
    const token = service.generateToken(MemberMother.create());
    const decoded = service.validateToken(token);
    expect(decoded).not.toBeNull();
  });

  it('should throw error', () => {
    expect(() => service.validateToken(UuidMother.random())).toThrowError();
  });
});
