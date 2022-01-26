import { FC } from 'react';
import { IUsers } from '../interfaces/interfaces';

type UserItemProps = {
	user: IUsers;
	onClick: (user: IUsers) => void;
};

const UserItem: FC<UserItemProps> = ({ user, onClick }) => (
	<div className="items" onClick={() => onClick(user)}>
		<img src={user.avatar_url} width={80} height={80} alt="avatar" />
		<h3 className="user-title">{user.login}</h3>
	</div>
);

export default UserItem;
