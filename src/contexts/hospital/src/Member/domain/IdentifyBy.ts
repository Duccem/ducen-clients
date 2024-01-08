import { Criteria, Filters, Filter, FilterField, FilterOperator, Operator, FilterValue } from "core";

export class IdentifyBy extends Criteria {
  constructor(field: string, value: string) {
    super(
      new Filters([
        new Filter(
          new FilterField(field),
          new FilterOperator(Operator.EQUAL),
          new FilterValue(value)
        )
      ])
    );
  }
}
