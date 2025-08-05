export type Pretty<Type> = {
  [K in keyof Type]: Type[K];
} & {};