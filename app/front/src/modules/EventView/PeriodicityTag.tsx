import React from 'react';
import { Intent, Tag } from '@blueprintjs/core';
import { PeriodicityType } from '../InputBindings/PeriodicitySelect';

interface PeriodicityTagProps {
	periodicity: PeriodicityType;
}

const periodicityTranslations: Record<PeriodicityType, string> = {
	once: 'Wydarzenie jednorazowe',
	daily: 'Powtarzane codziennie',
	weekly: 'Powtarzane co tydzień',
	monthly: 'Powtarzane co miesiąc',
	yearly: 'Powtarzane co rok',
};

const PeriodicityTag = ({ periodicity }: PeriodicityTagProps) => {
	const isSingleEvent = periodicity === 'once';

	return (
		<div>
			<Tag
				large
				fill={false}
				intent={Intent.PRIMARY}
				icon={isSingleEvent ? 'calendar' : 'repeat'}
			>
				{periodicityTranslations[periodicity]}
			</Tag>
		</div>
	);
};

export default PeriodicityTag;
