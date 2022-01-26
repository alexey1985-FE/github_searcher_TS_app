import { ChangeEvent, FC, useEffect, useState } from 'react';
import { IUsers } from '../interfaces/interfaces';
import UserItem from './UserItem';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../utils/debounce';
import { getStoredValues } from '../utils/getStoredValues';
import axiosInstance from '../utils/api';
import '../App.scss';
import '../index.scss';

const UsersSearchList: FC<IUsers> = () => {
	const [searchInput, setSearchInput] = useState(getStoredValues('userName'));
	const [users, setUsers] = useState<IUsers[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();
	const debouncedSearchTerm = useDebounce(searchInput, 1000);

	const inputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchInput(e.target.value);
		setIsLoading(true);

		if (e.target.value === '') {
			setUsers([]);
			setIsLoading(false);
			localStorage.removeItem('userName');
		}
	};

	useEffect(() => {
		if (debouncedSearchTerm) {
			try {
				axiosInstance
					.get(`/search/users?&q=${searchInput}&per_page=100`)
					.then(response => setUsers(response.data.items));
				setIsLoading(false);
			} catch (err) {
				console.log(err);
			}
		}
		localStorage.setItem('userName', JSON.stringify(searchInput));
	}, [debouncedSearchTerm, searchInput]);

	return (
		<div className="container">
			<form>
				<input
					type="search"
					placeholder="Search for Users"
					onChange={inputHandler}
					value={searchInput}
				/>
			</form>
      
			{isLoading ? (
				<h2>Loading...</h2>
			) : (
				users.map(user => (
					<UserItem
						key={user.id}
						user={user}
						onClick={() => navigate(`/users/${user.login}`)}
					/>
				))
			)}
		</div>
	);
};

export default UsersSearchList;
