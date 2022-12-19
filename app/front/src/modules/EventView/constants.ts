import { User } from '../../api/apiModels';
import { PeriodicityType } from '../InputBindings/PeriodicitySelect';

export interface EventInfo {
	name: string;
	description: string;
	dateFrom: Date;
	dateTo: Date;
	periodicity: PeriodicityType;
	isOwner: boolean;
	isPublic: boolean;
	usersList?: User[];
}

export const mockEventInfo: EventInfo = {
	name: 'Moje wydarzenie',
	// description: 'To jest opis wydarzenia, może być krótki, może być długi, różnie różnie',
	description: '',
	dateFrom: new Date(),
	dateTo: new Date(),
	periodicity: 'weekly',
	isPublic: true,
	isOwner: true,
};

export interface EventViewProps {}

export const dateFormat = 'DD MMMM YYYY HH:mm';
export const dayNameFormat = 'dddd';
