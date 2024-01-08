import { Command } from 'core/src/domain/Command';
import { CommandBus } from 'core/src/domain/CommandBus';

export class CommandBusMock implements CommandBus {
  private dispatchSpy = jest.fn();
  async dispatch(command: Command): Promise<void> {
    this.dispatchSpy(command);
  }
  assertLastPublishedEventIs(expectedCommand: Command) {
    const publishSpyCalls = this.dispatchSpy.mock.calls;

    expect(publishSpyCalls.length).toBeGreaterThan(0);
    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent = lastPublishSpyCall[0];

    expect(expectedCommand).toEqual(lastPublishedEvent);
  }
}
