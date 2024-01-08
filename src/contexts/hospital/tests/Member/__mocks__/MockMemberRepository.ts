import { Criteria, Uuid } from 'core';
import { Member } from '../../../src/Member/domain/Member';
import { MemberRepository } from '../../../src/Member/domain/MemberRepository';

export class MockMemberRepository implements MemberRepository {

  identifyMock: jest.Mock = jest.fn();
  createMock: jest.Mock = jest.fn();
  getByEmailMock: jest.Mock = jest.fn();
  getByIdMock: jest.Mock = jest.fn();
  getByGuildIdMock: jest.Mock = jest.fn();
  getMemberByCriteriaMock: jest.Mock = jest.fn();
  async getMemberByCriteria(criteria: Criteria): Promise<Member> {
    return this.getMemberByCriteriaMock(criteria);
  }
  async identify(username: string): Promise<Member> {
    return this.identifyMock(username);
  }
  async save(id: Uuid, member: Member): Promise<void> {
    this.createMock(id, member);
  }
  async getByEmail(email: string): Promise<Member> {
    return this.getByEmailMock(email);
  }
  async getById(id: Uuid): Promise<Member> {
    return this.getByIdMock(id);
  }
  getByGuildId(guildId: Uuid): Promise<Member> {
    return this.getByGuildIdMock(guildId);
  }

  returnOnIdentify(member: Member): void {
    this.identifyMock.mockReturnValue(member);
  }

  returnOnGetByEmail(member: Member): void {
    this.getByEmailMock.mockReturnValue(member);
  }

  returnOnGetById(member: Member): void {
    this.getByIdMock.mockReturnValue(member);
  }

  returnOnGetByGuildId(member: Member): void {
    this.getByGuildIdMock.mockReturnValue(member);
  }

  returnOnGetMemberByCriteria(member: Member): void {
    this.getMemberByCriteriaMock.mockReturnValue(member);
  }

  assertIdentifyHaveBeenCalledWith(username: string): void {
    expect(this.identifyMock).toHaveBeenCalledWith(username);
  }

  assertCreateHaveBeenCalledWith(id: Uuid, member: Member): void {
    expect(this.createMock).toHaveBeenCalledWith(id, member);
  }

  assertGetByEmailHaveBeenCalledWith(email: string): void {
    expect(this.getByEmailMock).toHaveBeenCalledWith(email);
  }

  assertGetByIdHaveBeenCalledWith(id: Uuid): void {
    expect(this.getByIdMock).toHaveBeenCalledWith(id);
  }

  assertGetByGuildIdHaveBeenCalledWith(guildId: Uuid): void {
    expect(this.getByGuildIdMock).toHaveBeenCalledWith(guildId);
  }

  assertGetMemberByCriteriaHaveBeenCalledWith(criteria: Criteria): void {
    expect(this.getMemberByCriteriaMock).toHaveBeenCalledWith(criteria);
  }
}
