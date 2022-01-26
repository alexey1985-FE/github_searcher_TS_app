import { FC } from 'react';
import { IRepos } from '../interfaces/interfaces';

type RepoItemProps = {
	repo: IRepos;
};

const RepoItem: FC<RepoItemProps> = ({ repo }) => (
	<div key={repo.name} className="items">
		<a href={repo.html_url}>{repo.name}</a>
		<div className="items__repo">
			<span>{repo.forks_count} Forks</span>
			<span>{repo.stargazers_count} Stars</span>
		</div>
	</div>
);

export default RepoItem;
