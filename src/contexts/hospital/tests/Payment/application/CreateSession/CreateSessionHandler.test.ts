import { UuidMother } from "core";
import { GetGuildInformationQuery } from "../../../../src/Guild/application/GetGuildInformation/GetGuildInformationQuery";
import { CreateSessionCommand } from "../../../../src/Payment/application/CreateSession/CreateSessionCommand";
import { CreateSessionHandler } from "../../../../src/Payment/application/CreateSession/CreateSessionHandler";
import { GuildMother } from "../../../Guild/domain/GuildMother";
import { QueryBusMock } from "../../../__mocks__/QueryBusMock";
import { MockPaymentRepository } from "../../__mocks__/MockPaymentRepository";
import { MockPaymentService } from "../../__mocks__/MockPaymentService";

describe('CreateSessionHandler', () => {
  let createSessionHandler: CreateSessionHandler;
  let paymentService: MockPaymentService;
  let bus: QueryBusMock;
  let repository: MockPaymentRepository;

  beforeEach(() => {
    paymentService = new MockPaymentService();
    bus = new QueryBusMock();
    repository = new MockPaymentRepository();
    createSessionHandler = new CreateSessionHandler(bus, repository,paymentService);
  });

  it('should create a session', async () => {
    const command = new CreateSessionCommand(UuidMother.random(), 'monthly');
    const query = new GetGuildInformationQuery(command.guildId);
    const guild = GuildMother.create();
    bus.returnAsk(guild);
    paymentService.returnCreateSession(UuidMother.hash(), 'http://localhost:4200/auth/completed');
    await createSessionHandler.handle(command);
    bus.assertLastPublishedEventIs(query);
    paymentService.assertCreateSessionIsCalledWith(guild.getPlan(), command.period);
    repository.assertSaveIsCalledWith();
  });
});
