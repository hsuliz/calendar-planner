import React, { useState } from 'react';
import { Button, Callout, Classes, Dialog, Intent } from '@blueprintjs/core';
import { User } from '../../../api/apiModels';
import { removeUserFromEvent } from '../../../api/eventsRequests';
import { useAuth } from '../../../contexts/useAuth';

interface ParticipantsTableProps {
   eventId: string;
   participants: User[];
   editable: boolean;
   refetchEventDetails: () => void;
}

const ParticipantsTable = ({
   eventId,
   participants,
   editable,
   refetchEventDetails,
}: ParticipantsTableProps) => {
   const { token } = useAuth();
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [selectedParticipantEmail, setParticipantEmail] = useState('');

   const onRemoveDialogClose = () => {
      setIsDialogOpen(false);
   };

   const onOpenRemovalDialog = (participantMail: string) => {
      console.log('remove dude with mail = ', participantMail);
      setParticipantEmail(participantMail);
      setIsDialogOpen(true);
   };

   const onRemoveParticipant = async () => {
      try {
         await removeUserFromEvent(eventId, selectedParticipantEmail, token);
         setIsDialogOpen(false);
         refetchEventDetails();
      } catch {
         // TODO komunikat błędu
      }
   };

   if (participants.length < 1) {
      return (
         <Callout title='Trochę tu pusto' icon='people' intent={Intent.PRIMARY}>
            W tym wydarzeniu nikt inny nie bierze udziału
         </Callout>
      );
   }

   return (
      <>
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
                  <Button fill intent={Intent.DANGER} onClick={onRemoveParticipant}>
                     Potwierdzam, usuń
                  </Button>
               </div>
            </div>
         </Dialog>

         <table
            className={[Classes.HTML_TABLE, Classes.HTML_TABLE_STRIPED].join(' ')}
            style={{ width: '100%' }}
         >
            <thead>
               <tr>
                  {editable && <th />}
                  <th>Imię i Nazwisko</th>
                  <th>E-mail</th>
               </tr>
            </thead>
            <tbody>
               {participants.map((user) => (
                  <tr key={user.email}>
                     {editable && (
                        <td>
                           <Button
                              icon='remove'
                              intent={Intent.DANGER}
                              onClick={() => onOpenRemovalDialog(user.email)}
                           />
                        </td>
                     )}
                     <td>
                        {user.firstName} {user.lastName}
                     </td>
                     <td>{user.email}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default ParticipantsTable;
