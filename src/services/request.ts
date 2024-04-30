import axios, {
  AxiosHeaders,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import tokenUtil from "../utils/token.ts";
import { BASE_SERVER_URL } from "../utils/common.ts";

export const getAuthorization = (
  token?: string,
): AxiosRequestConfig["headers"] =>
  token ? { Authorization: `Bearer ${token}` } : {};

const katanaAxios = axios.create({
  baseURL: BASE_SERVER_URL,
});

katanaAxios.interceptors.request.use(
  async (options: InternalAxiosRequestConfig & { allowGuest?: boolean }) => {
    // if (!testApi(options.url)) return options;
    const token = await tokenUtil.getToken();
    return {
      ...options,
      url: `${options.url}`,
      headers: {
        ...options.headers,
        ...getAuthorization(token),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      } as AxiosHeaders & { timezone: string },
    };
  },
  () => {},
);

katanaAxios.interceptors.response.use(
  (res) => {
    if (toString.call(res.data) === "[object Blob]") {
      return res.data;
    }
    return res.data.data;
  },
  () => {},
);

export default katanaAxios;
