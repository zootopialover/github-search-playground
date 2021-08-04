export type GitHubRepository = {
    id: string;
    name: string;
    language: string;
    owner: object;
    stargazers_count: number;
    created_at : string
}

export type GitHubSearchResultType = {
    total_count: number;
    incomplete_results: boolean;
    items: Array<GitHubRepository>
}