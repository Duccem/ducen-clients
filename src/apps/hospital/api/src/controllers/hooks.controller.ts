import { Body, Controller, Headers, HttpStatus, Inject, Post } from '@nestjs/common';
import { CommandBus } from 'core';
import { SessionStatusChangedCommand, StripePaymentProvider } from 'hospital';

@Controller('hooks')
export class HooksController {
  constructor(@Inject('COMMAND_BUS') private commandBus: CommandBus) {}

  @Post('stripe')
  async stripeHook(@Body() body: any, @Headers('stripe-signature') sig: string): Promise<any> {
    const { type, data } = body;
    const event = StripePaymentProvider.allowedEvents.get(type);
    if (!event) return HttpStatus.OK;
    const command = new SessionStatusChangedCommand(data.object.id, event, sig);
    await this.commandBus.dispatch(command);
    return HttpStatus.OK;
  }
}
