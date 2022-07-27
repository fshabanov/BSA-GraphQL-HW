import React, { useEffect, useState } from 'react';

export default function Header({
	sortBy,
	setSortBy,
	orderType,
	setOrderType,
	setFilter,
	count,
	page,
	setPage,
	messagesPerPage,
	setMessagesPerPage,
}) {
	const [numOfPages, setNumOfPages] = useState(1);

	const handleSortChange = (e) => {
		setSortBy(e.target.value);
	};

	useEffect(() => {
		setNumOfPages(Math.ceil(count / messagesPerPage));
	}, [count, messagesPerPage]);

	const handleOrderChange = (e) => {
		setOrderType(e.target.value);
	};

	const handlePrev = () => {
		setPage((p) => (p <= 2 ? 1 : p - 1));
	};

	const handleNext = () => {
		setPage((p) => (p >= numOfPages - 1 ? numOfPages : p + 1));
	};

	let timeout;
	const handleFilterChange = (e) => {
		// setFilterInput(e.target.value);
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			setFilter(e.target.value);
		}, 500);
	};

	return (
		<div className='flex items-center justify-around'>
			<div className='m-4'>
				<h2 className='text-xl font-bold mb-4'>Sort By:</h2>
				<div className='flex items-center justify-around gap-3'>
					<div className='flex items-center gap-1'>
						<label htmlFor='created_at'>Newest</label>
						<input
							type='radio'
							value='created_at'
							name='sort'
							checked={sortBy === 'created_at'}
							onChange={handleSortChange}
							id='created_at'
						/>{' '}
					</div>
					<div className='flex items-center gap-1'>
						<label htmlFor='likes'>Likes</label>
						<input
							type='radio'
							value='likes'
							name='sort'
							checked={sortBy === 'likes'}
							onChange={handleSortChange}
							id='likes'
						/>{' '}
					</div>
					<div className='flex items-center gap-1'>
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
				</div>
			</div>
			<div className='m-4'>
				<h2 className='text-xl font-bold mb-4'>Order type:</h2>
				<div className='flex items-center justify-around gap-3'>
					<div className='flex items-center gap-1'>
						<label htmlFor='asc'>Ascending</label>
						<input
							type='radio'
							value='asc'
							name='order'
							checked={orderType === 'asc'}
							onChange={handleOrderChange}
							id='asc'
						/>{' '}
					</div>
					<div className='flex items-center gap-1'>
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
			</div>
			<div className='m-4'>
				<h2 className='text-xl font-bold mb-4'>Search</h2>
				<input
					className='border rounded-md p-3'
					placeholder='Search'
					// value={filterInput}
					onChange={handleFilterChange}
				/>
			</div>
			<div className='m-4'>
				<h2 className='text-xl font-bold mb-4'>Pagination</h2>
				<div className='flex items-center'>
					<button className='border py-2 px-5 rounded-md' onClick={handlePrev}>
						Prev
					</button>
					<p className='mx-3'>
						{page}/{numOfPages}
					</p>
					<button className='border py-2 px-5 rounded-md' onClick={handleNext}>
						Next
					</button>
				</div>
			</div>
			<div className='m-4'>
				<h2 className='text-xl font-bold mb-4'>Number of messages per page</h2>
				<div className='flex items-center justify-around gap-3'>
					<div className='flex items-center gap-1'>
						<label htmlFor='5'>5</label>
						<input
							type='radio'
							value={5}
							name='mesPerPage'
							id='5'
							checked={messagesPerPage === 5}
							onChange={() => {
								setMessagesPerPage(5);
								setPage(1);
							}}
						/>
					</div>
					<div className='flex items-center gap-1'>
						<label htmlFor='10'>10</label>
						<input
							type='radio'
							value={10}
							name='mesPerPage'
							id='10'
							checked={messagesPerPage === 10}
							onChange={() => {
								setMessagesPerPage(10);
								setPage(1);
							}}
						/>
					</div>
					<div className='flex items-center gap-1'>
						<label htmlFor='15'>15</label>
						<input
							type='radio'
							value={15}
							name='mesPerPage'
							id='15'
							checked={messagesPerPage === 15}
							onChange={() => {
								setMessagesPerPage(15);
								setPage(1);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
