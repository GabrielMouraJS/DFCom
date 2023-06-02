export interface TokenProps {
  userId: string;
  expiresAt: Date;
}
export class Token {
  private _id: string;
  private props: TokenProps;
  constructor(props: TokenProps, id?: string) {
    this._id = id;
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get expiresAt(): Date {
    return this.props.expiresAt;
  }
}
