import React, { useState } from 'react';

import { MenuItem } from '@blueprintjs/core';
import { Suggest2 } from '@blueprintjs/select';
import { mockUsers } from './constants';
import * as H from './helpers';
import { User } from '../../api/apiModels';

const UsersSuggest = () => {
	const [suggestions, setSuggestions] = useState<User[]>([]);
	const [currentQuery, setCurrentQuery] = useState('');

	const onQueryChange = (query: string, event?: React.ChangeEvent | undefined) => {
		if (!event) return;

		setCurrentQuery(query);

		if (query.length > 1) {
			// TODO: request do API po wszystkich/5 najbardziej pasujących userów
			// szybciej będzie po wszystkich userów, więc może tak zróbmy, podpowiadanie i tak będzie ograne automatycznie
			// wtedy wystarczy setSuggestions(usersFromApi)

			setSuggestions(mockUsers);
		} else {
			setSuggestions([]);
		}
	};

	const onUserSelect = (user: User) => {
		console.log(user);
	};

	return (
		<div style={{ flexGrow: 3 }}>
			<Suggest2<User>
				openOnKeyDown
				resetOnClose
				resetOnQuery
				resetOnSelect
				closeOnSelect
				fill
				inputProps={{ placeholder: 'Wpisz e-mail...' }}
				inputValueRenderer={() => ''}
				items={suggestions}
				itemsEqual={H.areUsersEqual}
				itemPredicate={H.filterUser}
				itemRenderer={H.renderUser}
				noResults={
					currentQuery.length > 1 && (
						<MenuItem
							disabled={true}
							text='Nie ma takiego użytkownika'
							roleStructure='listoption'
						/>
					)
				}
				onQueryChange={onQueryChange}
				onItemSelect={onUserSelect}
			/>
		</div>
	);
};

export default UsersSuggest;
