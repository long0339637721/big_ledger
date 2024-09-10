import { UserRoleType } from '../../../../constants/index';

export type TokenExtractPayloadType = {
  id: number;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
};
