export interface response<T> {
  status: {
    isSuccess: boolean;
    message: string;
  };
  data: T;
}
