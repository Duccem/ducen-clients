import { Query } from 'core/src/domain/Query';
import { QueryBus } from 'core/src/domain/QueryBus';

export class QueryBusMock implements QueryBus {
  private dispatchSpy = jest.fn();
  async ask(query: Query): Promise<any> {
    return this.dispatchSpy(query);
  }
  returnAsk(value: any) {
    this.dispatchSpy.mockReturnValue(value);
  }
  assertLastPublishedEventIs(expectedQuery: Query) {
    const publishSpyCalls = this.dispatchSpy.mock.calls;

    expect(publishSpyCalls.length).toBeGreaterThan(0);
    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1];
    const lastPublishedEvent = lastPublishSpyCall[0];

    expect(expectedQuery).toEqual(lastPublishedEvent);
  }
}
