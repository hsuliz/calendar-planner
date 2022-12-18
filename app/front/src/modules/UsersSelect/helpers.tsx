import { MenuItem, MenuItemProps } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, ItemRendererProps } from '@blueprintjs/select';
import { User } from '../../api/apiModels';

export const areUsersEqual = (userA: User, userB: User) => {
	return userA.email.toLowerCase() === userB.email.toLowerCase();
};

export function getUserItemProps(
	user: User,
	{ handleClick, handleFocus, modifiers, query }: ItemRendererProps
): MenuItemProps & React.Attributes & React.HTMLAttributes<HTMLAnchorElement> {
	return {
		active: modifiers.active,
		disabled: modifiers.disabled,
		key: user.email,
		label: user.email,
		onClick: handleClick,
		onFocus: handleFocus,
		roleStructure: 'listoption',
		text: `${user.firstName} ${user.lastName}`,
	};
}

export const renderUser: ItemRenderer<User> = (user, props) => {
	if (!props.modifiers.matchesPredicate) {
		return null;
	}
	return <MenuItem {...getUserItemProps(user, props)} />;
};

export const filterUser: ItemPredicate<User> = (query, user, _index, exactMatch) => {
	const normalizedEmail = user.email.toLowerCase();
	const normalizedQuery = query.toLowerCase();

	if (exactMatch) {
		return normalizedEmail === normalizedQuery;
	} else {
		return (
			`${normalizedEmail} ${user.firstName} ${user.lastName}`.indexOf(
				normalizedQuery
			) >= 0
		);
	}
};
