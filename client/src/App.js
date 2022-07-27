import { useState } from 'react';
import Header from './components/common/Header';
import Messages from './components/messages/Messages';

function App() {
	const [sortBy, setSortBy] = useState('created_at');
	const [orderType, setOrderType] = useState('asc');
	return (
		<div className='App'>
			<Header
				sortBy={sortBy}
				setSortBy={setSortBy}
				orderType={orderType}
				setOrderType={setOrderType}
			/>
			<Messages orderBy={sortBy} orderType={orderType} />
		</div>
	);
}

export default App;
