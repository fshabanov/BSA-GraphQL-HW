import { useState } from 'react';
import Header from './components/common/Header';
import Messages from './components/messages/Messages';

function App() {
	const [sortBy, setSortBy] = useState('created_at');
	const [orderType, setOrderType] = useState('asc');
	const [filter, setFilter] = useState('');
	const [count, setCount] = useState(0);
	const [page, setPage] = useState(1);
	const [messagesPerPage, setMessagesPerPage] = useState(10);
	return (
		<div className='App'>
			<Header
				sortBy={sortBy}
				setSortBy={setSortBy}
				orderType={orderType}
				setOrderType={setOrderType}
				setFilter={setFilter}
				count={count}
				page={page}
				setPage={setPage}
				messagesPerPage={messagesPerPage}
				setMessagesPerPage={setMessagesPerPage}
			/>
			<Messages
				orderBy={sortBy}
				orderType={orderType}
				filter={filter}
				setCount={setCount}
				page={page}
				messagesPerPage={messagesPerPage}
			/>
		</div>
	);
}

export default App;
