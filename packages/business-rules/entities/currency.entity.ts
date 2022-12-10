export class Currency {
  constructor(
    public symbol: string,
    public separator: string,
    public decimal: string,
    public precision: string,
    public code: string
  ) {}
}
