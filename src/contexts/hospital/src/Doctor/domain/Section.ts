import { BaseObject, DateValueObject, Primitives } from 'core';

export class Section extends BaseObject {
  constructor(public initHour: DateValueObject, public endHour: DateValueObject) {
    super();
  }

  toPrimitives(): Primitives<Section> {
    return {
      initHour: this.initHour.value,
      endHour: this.endHour.value,
    };
  }

  fromPrimitives(data: Primitives<Section>): Section {
    return new Section(new DateValueObject(data.initHour), new DateValueObject(data.endHour));
  }
}
