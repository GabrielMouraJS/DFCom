import { Replace } from 'src/helpers/Replace';
import { randomUUID } from 'crypto';
import { hashPassword } from 'src/helpers/Hash';

export interface UserProps {
  email: string;
  password: string;
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(value: string) {
    this.props.email = value;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(value: string) {
    this.props.password = hashPassword(value);
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
