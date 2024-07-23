import axios, { AxiosError } from "axios";
import { dispatch } from "../store";
import { deleteAccount } from "../store/user";

const TIMEOUT = 20000;
const instance = axios.create({
	timeout: TIMEOUT,
});

const HEADERS = { "Content-Type": "application/json" };

export let accessToken = "";

instance.interceptors.request.use(
	(req: any) => {
		req.baseURL = `${import.meta.env["VITE_APP_BASE_API"]}`;
		let authen = {};
		if (accessToken) {
			authen = { Authorization: `Bearer ${accessToken}` };
		}

		req.headers = {
			...HEADERS,
			...req.headers,
			...authen,
		};
		return req;
	},
	(error: any) => {
		Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(res: any) => {
		const result = res;
		return Promise.resolve(result);
	},
	(axiosError: any) => {
		if (axiosError && !axiosError?.response) {
			throw new Error("Send request API failed");
		}
		console.log("axiosError", axiosError.response?.data?.statusCode);

		if (axiosError.response?.data?.statusCode === 401) {
			console.log()

			dispatch(deleteAccount());
		}

		return Promise.reject(axiosError.response);
	}
);

export const setAccessToken = (token: string) => {
	accessToken = token;
};

export default instance;
