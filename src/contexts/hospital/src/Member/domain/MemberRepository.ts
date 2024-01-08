import { Criteria, Nullable, Uuid } from 'core';
import { Member } from './Member';

export interface MemberRepository {
  identify(username: string): Promise<Nullable<Member>>;
  save(id: Uuid, member: Member): Promise<void>;
  getByEmail(email: string): Promise<Nullable<Member>>;
  getById(id: Uuid): Promise<Nullable<Member>>;
  getByGuildId(guildId: Uuid): Promise<Nullable<Member>>;
  getMemberByCriteria(criteria: Criteria): Promise<Nullable<Member>>;
}
