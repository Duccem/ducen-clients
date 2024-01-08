import { Criteria } from '../../../domain/Criteria/Criteria';
import { Filter } from '../../../domain/Criteria/Filter/Filter';
import { Operator } from '../../../domain/Criteria/Filter/FilterOperator';
import { AndFilters, Filters, NotFilters, OrFilters } from '../../../domain/Criteria/Filter/Filters';
import { Order } from '../../../domain/Criteria/Order/Order';
interface TransformerFunction<T, K> {
  (value: T): K;
}

type MongoFilterOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$regex' | '$in' | '$nin';
type MongoFilterValue = boolean | string | number | any;
type MongoFilterOperation = { [operator in MongoFilterOperator]?: MongoFilterValue };
export type MongoFilter =
  | { [field: string]: MongoFilterOperation }
  | { [field: string]: { $not: MongoFilterOperation } | MongoFilter[] };
export type MongoDirection = 1 | -1;
export type MongoSort = { [field: string]: MongoDirection };

interface MongoQuery {
  filter: MongoFilter;
  sort: MongoSort;
  skip: number;
  limit: number;
}

export class MongoCriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, MongoFilter>>;

  constructor() {
    this.filterTransformers = new Map<Operator, TransformerFunction<Filter, MongoFilter>>([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter],
    ]);
  }

  public Criteria(criteria?: Criteria): MongoQuery {
    if (!criteria)
      return {
        filter: {},
        sort: { _id: -1 },
        skip: 0,
        limit: 50,
      };
    return {
      filter: criteria.hasFilter() ? this.Filter(criteria.filters) : {},
      sort: criteria.hasOrder() ? this.Sort(criteria.order) : { _id: -1 },
      skip: criteria.hasPaginator() ? criteria.paginator.offset.getValue() : 0,
      limit: criteria.hasPaginator() ? criteria.paginator.limit.getValue() : 1,
    };
  }

  public Filter(filters: Filters): MongoFilter {
    const filter = filters.filters.map((filter) => {
      const transformer = this.filterTransformers.get(filter.operator.value);

      if (!transformer) {
        throw Error(`Unexpected operator value ${filter.operator.value}`);
      }

      return transformer(filter);
    });
    if (filters instanceof AndFilters) return { $and: [...filter] };
    if (filters instanceof OrFilters) return { $or: [...filter] };
    if (filters instanceof NotFilters) return { $not: Object.assign({}, ...filter) };
    return Object.assign({}, ...filter);
  }

  public Sort(order: Order): MongoSort {
    return {
      [order.orderBy.value === 'id' ? '_id' : order.orderBy.value]: order.orderType.isAsc() ? 1 : -1,
    };
  }

  public Search(text: string) {
    return [
      { $match: { $text: { $search: text } } },
      { $addFields: { score: { $meta: 'textScore' } } },
      { $sort: { score: { $meta: 'textScore' } } },
    ];
  }

  private equalFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $eq: filter.value.value } };
  }

  private notEqualFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $ne: filter.value.value } };
  }

  private greaterThanFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $gt: filter.value.value } };
  }

  private lowerThanFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $lt: filter.value.value } };
  }

  private containsFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $regex: filter.value.value } };
  }

  private notContainsFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $not: { $regex: filter.value.value } } };
  }
}
