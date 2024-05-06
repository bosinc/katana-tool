import { MerchantType, UserRole } from "dto/enum";

export enum MessageActionType {
  IMAGE_ACTION = "image_action",
  USER_ACTION = "user_action",
}

export enum StorePlatform {
  SHOPIFY = "SHOPIFY",
  PEAR = "PEAR",
}

export type TokenState = {
  iat: number;
  iss?: string;
  sub?: string;
  aud?: string[] | string;
  exp?: number;
  nbf?: number;
  jti?: string;
} & {
  userRole: UserRole;
  userId: string;
  consumerId: string;
  promoterId?: string;
  phoneNumber: string;
  email?: string;
};

export interface StoreItemVO {
  id: string;
  shopUrl: string;
  storeName: string;
  platform?: StorePlatform | null;
  connected: boolean;
  type: MerchantType;
  returnPolicy: string;
  deliveryTime: number[];
  isReturnPolicyAllowed: boolean;
  shippingFee: number;
}

export interface StoreVO extends StoreItemVO {
  phoneNumber: string | null;
  description: string | null;
  logo: string | null;
  bio: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
  commissionRate: number | null;
  invitationId: string;
  merchantUserId: string;
  accessToken: string;
  isConnected: boolean;
  connectUpdatedAt: string | null;
  isInstalled: boolean;
  installUpdatedAt: null | string;
  installLink: string;
  rawData: {
    session: {
      id: string;
      shop: string;
      scope: string;
      state: string;
      isOnline: boolean;
      accessToken: string;
    };
  };
}

export interface UserVO {
  id: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber: string;
  firstName: null | string;
  lastName: null | string;
  email: string;
  defaultMerchantId: null | string;
}

export enum StorageKeys {
  BASE_URL = "katana_tool_search_base_url",
  SELECT_STORE_ID = "katana_tool_select_store_id",
}
