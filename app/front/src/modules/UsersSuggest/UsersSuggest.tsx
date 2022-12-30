import React, { useState } from 'react';

import { MenuItem } from '@blueprintjs/core';
import { Suggest2 } from '@blueprintjs/select';
import * as H from './helpers';
import { User } from '../../api/apiModels';
import { useAuth } from '../../contexts/useAuth';
import { useQuery } from 'react-query';
import { addUserToEvent, getSuggestions } from '../../api/eventsRequests';

interface UserSuggestProps {
	eventId: string;
}

const UsersSuggest = ({ eventId }: UserSuggestProps) => {
	const [suggestions, setSuggestions] = useState<User[]>([]);
	const [currentQuery, setCurrentQuery] = useState('');
	const { token } = useAuth();
	const { data } = useQuery(['suggestions', token], () => getSuggestions(eventId, token));

	const onQueryChange = (query: string, event?: React.ChangeEvent | undefined) => {
		if (!event) return;

		setCurrentQuery(query);

		if (query.length > 1) {
			setSuggestions(data || []);
		} else {
			setSuggestions([]);
		}
	};

	const onUserSelect = async (user: User) => {
		const result = await addUserToEvent(eventId, user.email, token);
		console.log(result);
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
