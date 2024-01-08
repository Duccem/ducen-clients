import { Query, QueryHandler, Uuid } from 'core';
import { GetMemberByGuildId } from '../../domain/GetMemberByGuildId';
import { Member } from '../../domain/Member';
import { MemberNotExist } from '../../domain/MemberNotExist';
import { MemberRepository } from '../../domain/MemberRepository';
import { GetMemberMasterQuery } from './GetMemberMasterQuery';

export class GetMemberMasterHandler implements QueryHandler<GetMemberMasterQuery> {
  constructor(private readonly repository: MemberRepository) {}

  subscribedTo(): Query {
    return GetMemberMasterQuery;
  }

  public async handle({ guildId }: GetMemberMasterQuery): Promise<Member> {
    const member = await this.repository.getMemberByCriteria(new GetMemberByGuildId(new Uuid(guildId)));
    if (!member) throw new MemberNotExist();
    return member;
  }
}
