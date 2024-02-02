export abstract class ServiceContract<K, T = void, J = void> {
  abstract createMany?(dto: T[]): Promise<unknown>;
  abstract create?(dto: T): Promise<K>;
  abstract findById?(id: string): Promise<K>;
  abstract findAll?(): Promise<K>[];
  abstract update?(dto: J): Promise<K>;
  abstract remove?(id: string): Promise<boolean>;
}
