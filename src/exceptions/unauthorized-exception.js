export class UnauthorizedException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
