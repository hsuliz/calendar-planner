import { Classes } from '@blueprintjs/core';
import styled from 'styled-components';

export const EventInfoWrapper = styled.main`
	background-color: #282c34;
	color: white;
	width: 80%;
	margin: 10px auto 20px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const TitleSpan = styled.span`
	display: flex;
	align-items: baseline;
	gap: 10px;
`;

export const EventTimeFrameWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;

	${'.' + Classes.TAG} {
		margin-left: 6px;
	}
`;
