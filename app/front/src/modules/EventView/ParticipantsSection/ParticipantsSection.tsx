import React, { useState } from 'react';
import { Button, Classes, Dialog, Intent } from '@blueprintjs/core';
import UsersSuggest from '../../UsersSuggest/UsersSuggest';
import { mockParticipants } from './constants';
import ParticipantsTable from './ParticipantsTable';
import * as P from './parts';
import { Tooltip2 } from '@blueprintjs/popover2';

interface ParticipantsSectionProps {
   isOwner: boolean;
}

const ParticipantsSection = ({ isOwner }: ParticipantsSectionProps) => {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [selectedParticipantEmail, setParticipantEmail] = useState('');
   const [isCopyToastOpen, setIsCopyToastOpen] = useState(false);

   const onRemoveDialogClose = () => {
      setIsDialogOpen(false);
   };

   const onRemoveParticipant = (participantMail: string) => () => {
      console.log('remove dude with mail = ', participantMail);
      setParticipantEmail(participantMail);
      setIsDialogOpen(true);
   };

   const onCopyCodeToClipboard = () => {
      setIsCopyToastOpen(true);

      setTimeout(() => {
         setIsCopyToastOpen(false);
      }, 1500);
   };

   return (
      <div>
         <Dialog
            className={Classes.DARK}
            isOpen={isDialogOpen}
            title='Uwaga!'
            onClose={onRemoveDialogClose}
         >
            <div className={Classes.DIALOG_BODY}>
               <h4>
                  Chcesz usunąć użytkownika <b>{selectedParticipantEmail}</b> z listy
                  uczestników?
               </h4>
               <div style={{ display: 'flex', gap: 5 }}>
                  <Button intent={Intent.NONE} minimal fill onClick={onRemoveDialogClose}>
                     Anuluj
                  </Button>
                  <Button fill intent={Intent.DANGER}>
                     Potwierdzam, usuń
                  </Button>
               </div>
            </div>
         </Dialog>

         <h3>Zaproś użytkowników</h3>
         <P.InvitationSectionWrapper>
            <UsersSuggest />
            <span>lub</span>
            <Tooltip2
               className={Classes.TOOLTIP_INDICATOR}
					intent={Intent.PRIMARY}
					position='top'
               content='skopiowano!'
               isOpen={isCopyToastOpen}
            >
               <Button minimal intent={Intent.PRIMARY} icon='clipboard' onClick={onCopyCodeToClipboard}>
                  Skopiuj link zapraszający
               </Button>
            </Tooltip2>
         </P.InvitationSectionWrapper>

         <h3>Lista uczestników</h3>

         <ParticipantsTable
            participants={mockParticipants}
            editable={isOwner}
            onRemoveParticipant={onRemoveParticipant}
         />
      </div>
   );
};

export default ParticipantsSection;
