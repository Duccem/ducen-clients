import { GuildResolver } from '../resolvers/guild.resolver';
import { MemberResolver } from '../resolvers/member.resolver';
import { PaymentResolver } from '../resolvers/payment.resolver';

export const resolvers = [GuildResolver, MemberResolver, PaymentResolver];
