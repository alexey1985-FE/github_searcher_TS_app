export interface IUsers {
	id: number;
	login: string;
	avatar_url: string;
	public_repos: number;
}

export interface IUser extends IUsers {
	email: string;
	location: string;
	created_at: string;
	followers: number;
	following: number;
	bio: string;
}

export interface IRepos {
  items(items: any): void | PromiseLike<void>;
	name: string;
	forks_count: number;
	stargazers_count: number;
	html_url: string;
}
