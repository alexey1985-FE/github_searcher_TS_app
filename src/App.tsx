import { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import UserItemPage from './components/UserItemPage';
import UsersSearchList from './components/UsersSearchList';

const App: FC = () => {
	return (
		<HashRouter>
			<div className="App">
				<h2>Github Searcher</h2>
				<Routes>
					<Route
						path={'/'}
						element={
							<UsersSearchList 
                id={0} 
                login={''} 
                avatar_url={''} 
                public_repos={0} 
              />
						}
					></Route>
					<Route
						path={'/users/:id'}
						element={
							<UserItemPage
								email={''}
								location={''}
								created_at={''}
								followers={0}
								following={0}
								id={0}
								login={''}
								avatar_url={''}
								bio={''}
								public_repos={0}
							/>
						}
					></Route>
				</Routes>
			</div>
		</HashRouter>
	);
}

export default App;
