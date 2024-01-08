import { Criteria, Filter, FilterField, FilterOperator, FilterValue, Filters, Operator, Uuid } from "core";

export class GetMemberById extends Criteria {
  constructor(public readonly id: Uuid) {
    super(
      new Filters([
        new Filter(
          new FilterField('id'),
          new FilterOperator(Operator.EQUAL),
          new FilterValue(id.value)
        )
      ])
    );
  }
}
