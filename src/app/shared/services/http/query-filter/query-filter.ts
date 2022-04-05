import { QueryFilterParam } from './query-filter.interface';

export class QueryFilter {

  public static create(param: QueryFilterParam): QueryFilterParam {
    return {
      field: param.field,
      value: param.value
    };
  }

  public static concat(param: QueryFilterParam, query: string): string {
    return query && !QueryFilter.paramExist(query, param.field) ? `${query}&${param.field}=${param.value}` : `/${param.field}=${param.value}`;
  }

  private static paramExist(query: string, field: string): boolean {
    return query.includes(`${field}=`);
  }

}
