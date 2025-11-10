export class Slug {
  private constructor(readonly value: string) {
    if (!value || !/^[a-z0-9-]+$/.test(value)) {
      throw new Error('Slug invalide');
    }
  }
  static from(value: string) {
    return new Slug(value);
  }
  static fromRoute(route: string) {
    const m = route.match(/\/p\/([^\/?#]+)/i);
    return Slug.from(m?.[1] ?? route.replace(/^\/+|\/+$/g, '').replace(/\//g, '-'));
  }
  toString() {
    return this.value;
  }
}
