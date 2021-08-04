import axios from "axios";
import { GitHubSearchResultType } from "../models";

const API_BASE_URL = "https://api.github.com";

export const searchPublicRepositories = (param: { query: string, offset: number, count: number, page: number, sortKey: string, order: string }) => {
    return axios.get<GitHubSearchResultType>(`${API_BASE_URL}/search/repositories?q=${param.query}&per_page=${param.count}&page=${param.page}&sort=${param.sortKey}&order=${param.order}`);
};
