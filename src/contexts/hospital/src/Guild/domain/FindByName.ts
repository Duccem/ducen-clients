import { Criteria, Filter, FilterField, FilterOperator, FilterValue, Filters, Operator } from "core";

export class FindByName extends Criteria {
  constructor(public readonly name: string) {
    super(
      new Filters([
        new Filter(
          new FilterField('name'),
          new FilterOperator(Operator.EQUAL),
          new FilterValue(name)
        )
      ])
    );
  }
}
