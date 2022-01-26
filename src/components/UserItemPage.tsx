import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IRepos, IUser } from '../interfaces/interfaces';
import { useDebounce } from '../utils/debounce';
import { getStoredValues } from '../utils/getStoredValues';
import axiosInstance from '../utils/api';
import RepoItem from './RepoItem';

type UserItemsPageParams = {
	id: string;
};

const UserItemPage: FC<IUser> = () => {
	const [user, setUser] = useState<IUser | null>(null);
	const [allRepos, setAllRepos] = useState<IRepos[]>([]);
	const [repos, setRepos] = useState<IRepos[]>([]);
	const [searchRepos, setSearchRepos] = useState<string>(getStoredValues('repo'));
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const params = useParams<UserItemsPageParams>();
	const debouncedSearchTerm = useDebounce(searchRepos, 1000);

	const reposHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchRepos(e.target.value);
		setIsLoading(true);

		if (e.target.value === '') {
			setIsLoading(false);
			setRepos([]);
			localStorage.removeItem('repo');
		}
	};

	useEffect(() => {
		if (debouncedSearchTerm) {
			setIsLoading(true);
			try {
				axiosInstance
					.get(`/search/repositories?q=${searchRepos}+user:${user?.login}`)
					.then(response => setRepos(response.data.items));
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		}
		localStorage.setItem('repo', JSON.stringify(searchRepos));
	}, [debouncedSearchTerm, searchRepos, user?.login]);

	useEffect(() => {
		setIsLoading(true);
		axiosInstance
			.get<IRepos[]>(`/users/${user?.login}/repos?&per_page=100`)
			.then(response => setAllRepos(response.data));
		setIsLoading(false);
	}, [user?.login]);

	useEffect(() => {
		try {
			axiosInstance
				.get<IUser>(`/users/${params.id}`)
				.then(response => setUser(response.data));
		} catch (err) {
			console.log(err);
		}
	}, []);

	return (
		<>
			<div className="user">
				<div>
					<img src={user?.avatar_url} width={300} height={300} alt="avatar" />
				</div>
				<div className="user__info">
					<h3>UserName: {user?.login}</h3>
					<h3>Email: {user?.email || <i>null</i>}</h3>
					<h3>Location: {user?.location || <i>null</i>}</h3>
					<h3>Join Date: {user?.created_at}</h3>
					<h3>{user?.followers} Followers</h3>
					<h3>Following: {user?.following}</h3>
				</div>
			</div>
			<div>{user?.bio}</div>
			<form className="container">
				<input
					type="search"
					placeholder="Search for User's Repositories"
					onChange={reposHandler}
					value={searchRepos}
				/>
			</form>
			<div>
				{isLoading ? (
					<h2>Loading...</h2>
				) : searchRepos === '' || repos.length === 0 ? (
					allRepos.map(repo => <RepoItem repo={repo} key={repo.name} />)
				) : (
					repos.map(repo => <RepoItem repo={repo} key={repo.name} />)
				)}
			</div>
		</>
	);
};

export default UserItemPage;
