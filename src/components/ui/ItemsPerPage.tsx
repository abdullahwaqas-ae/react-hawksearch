import React from 'react';

import { useHawkSearch } from 'components/StoreProvider';

function ItemsPerPage() {
	const {
		store: { isLoading, searchResults, pendingSearch },
		actor,
	} = useHawkSearch();

	function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		actor.setSearch({
			MaxPerPage: Number(event.currentTarget.value),
			PageNo: 1, // if we change our max items per page, reset to page 1
		});
	}

	if (isLoading && (!searchResults || !searchResults.Sorting)) {
		return null;
	}

	return (
		<select value={pendingSearch.MaxPerPage} onChange={onChange}>
			{searchResults &&
				searchResults.Pagination &&
				searchResults.Pagination.Items.map(paginationItem => (
					<option key={paginationItem.PageSize} value={paginationItem.PageSize}>
						{paginationItem.Label}
					</option>
				))}
		</select>
	);
}

export default ItemsPerPage;