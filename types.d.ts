/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unnecessary-type-constraint -- To Do */
/// <reference types="./modules/katana-common/request.d.ts" />
/// <reference types="./modules/katana-common/response.d.ts" />
/// <reference types="./modules/katana-common/prisma.d.ts" />
interface Window {
  disableIntl?: number;
}
declare module "*.png" {
  const src: string;
  export default src;
}

type Classes = Readonly<Record<string, string>>;
declare module "*.css" {
  const classes: Classes;
  export default classes;
}

type RecordAny = Record<string, any>;

type ApiService<T extends unknown = any> = (
  data?: unknown,
  config?: RequestConfigCommon,
) => Promise<T>;

declare namespace API {
  interface Response<T extends RecordAny | boolean = any> {
    code: number;
    message: string;
    data: T;
    version: string;
  }

  interface PaginationInfo {
    pageNumber: number;
    pageSize: number;
    cursor?: string;
  }

  interface PaginationData<T extends RecordAny = any, D extends RecordAny = any>
    extends PaginationInfo {
    items: T[];
    totalCount: number;
    extra?: D;
  }

  interface InfiniteScrollData<T extends RecordAny = any> {
    list: T[];
    count?: number;
    pageNumber: number;
    pageSize: number;
    total?: number;
  }

  type PaginationResponse<T extends RecordAny = any> = Response<
    PaginationData<T>
  >;

  type RequestParams<T extends RecordAny = any> = T;
}
