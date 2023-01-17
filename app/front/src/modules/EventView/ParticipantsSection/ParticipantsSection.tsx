import React, { useState } from 'react';
import { Button, Classes, Intent } from '@blueprintjs/core';
import UsersSuggest from '../../UsersSuggest/UsersSuggest';
import { mockParticipants } from './constants';
import ParticipantsTable from './ParticipantsTable';
import * as P from './parts';
import { Tooltip2 } from '@blueprintjs/popover2';
import { User } from '../../../api/apiModels';

interface ParticipantsSectionProps {
   isOwner: boolean;
   eventId: string;
   participantsList: User[];
   refetchEventDetails: () => void;
}

const ParticipantsSection = ({
   isOwner,
   eventId,
   participantsList,
   refetchEventDetails,
}: ParticipantsSectionProps) => {
   const [isCopyToastOpen, setIsCopyToastOpen] = useState(false);

   const onCopyCodeToClipboard = () => {
      setIsCopyToastOpen(true);

      setTimeout(() => {
         setIsCopyToastOpen(false);
      }, 1500);
   };

   return (
      <div>
         <h3>Zaproś użytkowników</h3>
         <P.InvitationSectionWrapper>
            <UsersSuggest refetchEventDetails={refetchEventDetails}  eventId={eventId} />
            <span>lub</span>
            <Tooltip2
               className={Classes.TOOLTIP_INDICATOR}
               intent={Intent.PRIMARY}
               position='top'
               content='skopiowano!'
               isOpen={isCopyToastOpen}
            >
               <Button
                  minimal
                  intent={Intent.PRIMARY}
                  icon='clipboard'
                  onClick={onCopyCodeToClipboard}
               >
                  Skopiuj link zapraszający
               </Button>
            </Tooltip2>
         </P.InvitationSectionWrapper>

         <h3>Lista uczestników</h3>

         <ParticipantsTable
            eventId={eventId}
            participants={participantsList || mockParticipants}
            editable={isOwner}
            refetchEventDetails={refetchEventDetails}
         />
      </div>
   );
};

export default ParticipantsSection;
