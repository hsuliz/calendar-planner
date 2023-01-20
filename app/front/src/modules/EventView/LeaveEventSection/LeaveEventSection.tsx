import React, { useState } from 'react';
import { Button, Callout, Classes, Dialog, Divider, Intent } from '@blueprintjs/core';
import { useNavigate } from 'react-router-dom';
import { deleteEvent, removeUserFromEvent } from '../../../api/eventsRequests';
import { useAuth } from '../../../contexts/useAuth';
import toast from '../../../utils/toast';

interface LeaveEventSectionProps {
   isOwner: boolean;
   eventId: string;
   eventName: string;
}

const LeaveEventSection = ({ isOwner, eventId, eventName }: LeaveEventSectionProps) => {
   const navigate = useNavigate();
   const { token, userEmail } = useAuth();
   const [isDialogOpen, setDialogOpen] = useState(false);

   const onOpenDialog = () => {
      setDialogOpen(true);
   };

   const onCloseDialog = () => {
      setDialogOpen(false);
   };

   const onDeleteEvent = async () => {
      const deleteStatus = await deleteEvent(eventId, token);

      if (deleteStatus) {
         toast.show({
            message: `Usunięto wydarzenie: ${eventName || ''}`,
            intent: Intent.PRIMARY,
            icon: 'trash',
            timeout: 5000,
         });
         return navigate('..', { relative: 'path' });
      }
   };

   const onLeaveEvent = async () => {
      const { success, failureReason } = await removeUserFromEvent(eventId, userEmail!, token);

      if (success) {
         toast.show({
            message: `Opuszczono wydarzenie: ${eventName || ''}`,
            intent: Intent.PRIMARY,
            icon: 'trash',
            timeout: 5000,
         });
         return navigate('..', { relative: 'path' });
      } else {
         toast.show({
            message: failureReason || 'Coś poszło nie tak. Spróbuj ponownie później.',
            intent: Intent.DANGER,
            icon: 'trash',
            timeout: 5000,
         });

      }
   }

   return (
      <div>
         <Divider />

         <Button icon='trash' onClick={onOpenDialog} intent={Intent.DANGER} fill>
            {isOwner ? 'Usuń wydarzenie' : 'Opuść wydarzenie'}
         </Button>

         <Dialog
            className={Classes.DARK}
            isOpen={isDialogOpen}
            onClose={onCloseDialog}
            isCloseButtonShown
            title='Uwaga!'
         >
            <Callout intent={Intent.DANGER}>
               {isOwner ? (
                  <p>Czy na pewno chcesz usunąć to wydarzenie? Tej akcji nie można cofnąć!</p>
               ) : (
                  <p>Czy na pewno chcesz opuścić to wydarzenie? Tej akcji nie można cofnąć!</p>
               )}

               <Button fill intent={Intent.DANGER} onClick={isOwner ? onDeleteEvent : onLeaveEvent}>
                  Potwierdzam
               </Button>
            </Callout>
         </Dialog>
      </div>
   );
};

export default LeaveEventSection;
