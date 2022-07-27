import React from 'react';

export default function Header({ sortBy, setSortBy, orderType, setOrderType }) {
	const handleSortChange = (e) => {
		setSortBy(e.target.value);
	};

	const handleOrderChange = (e) => {
		setOrderType(e.target.value);
	};
	return (
		<div>
			<div>
				<h2>Sort By:</h2>
				<label htmlFor='created_at'>Newest</label>
				<input
					type='radio'
					value='created_at'
					name='sort'
					checked={sortBy === 'created_at'}
					onChange={handleSortChange}
					id='created_at'
				/>{' '}
				<label htmlFor='likes'>Likes</label>
				<input
					type='radio'
					value='likes'
					name='sort'
					checked={sortBy === 'likes'}
					onChange={handleSortChange}
					id='likes'
				/>{' '}
				<label htmlFor='dislikes'>Dislikes</label>
				<input
					type='radio'
					value='dislikes'
					name='sort'
					checked={sortBy === 'dislikes'}
					onChange={handleSortChange}
					id='dislikes'
				/>{' '}
			</div>
			<div>
				<h2>Order type:</h2>
				<label htmlFor='asc'>Ascending</label>
				<input
					type='radio'
					value='asc'
					name='order'
					checked={orderType === 'asc'}
					onChange={handleOrderChange}
					id='asc'
				/>{' '}
				<label htmlFor='desc'>Descending</label>
				<input
					type='radio'
					value='desc'
					name='order'
					checked={orderType === 'desc'}
					onChange={handleOrderChange}
					id='desc'
				/>{' '}
			</div>
		</div>
	);
}
