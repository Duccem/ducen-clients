import { Criteria, Filter, FilterField, FilterOperator, FilterValue, Filters, Operator, Uuid } from "core";

export class GetMemberByGuildId extends Criteria {
  constructor(public readonly id: Uuid) {
    super(
      new Filters([
        new Filter(
          new FilterField('guildId'),
          new FilterOperator(Operator.EQUAL),
          new FilterValue(id.value)
        ),
        new Filter(
          new FilterField('roleId'),
          new FilterOperator(Operator.EQUAL),
          new FilterValue('MASTER')
        )
      ])
    );
  }
}
