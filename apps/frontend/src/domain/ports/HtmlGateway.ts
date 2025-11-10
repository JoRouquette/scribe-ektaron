export interface HtmlGateway {
  fetch(path: string): Promise<string>;
}
