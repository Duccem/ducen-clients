import { Controller, Inject } from '@nestjs/common';
import { CommandBus } from 'core';


@Controller('hooks')
export class HooksController {
  constructor(@Inject('COMMAND_BUS') private commandBus: CommandBus) {}
}
