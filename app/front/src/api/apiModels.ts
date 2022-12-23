// there will be type definitions for objects from API

import { PeriodicityType } from '../modules/InputBindings/PeriodicitySelect';

export interface User {
	email: string;
	firstName: string;
	lastName: string;
}

export interface Event {
	id: number;
	name: string;
	description: string;
	dateFrom: string;
	dateTo: string;
	isPublic: boolean;
	periodicity: PeriodicityType;
	until?: string;
}
