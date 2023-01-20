import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button, Classes, Divider, Intent, Spinner, Tag } from '@blueprintjs/core';
import moment from 'moment';
import { useQuery } from 'react-query';
import PeriodicityTag from './PeriodicityTag';
import ParticipantsSection from './ParticipantsSection/ParticipantsSection';
import DescriptionSection from './DescriptionSection/DescriptionSection';
import { getEvent } from '../../api/eventsRequests';
import { useAuth } from '../../contexts/useAuth';
import * as P from './parts';
import * as C from './constants';
import LeaveEventSection from './LeaveEventSection/LeaveEventSection';

const EventView = (props: C.EventViewProps) => {
   const { id: eventId } = useParams();
   const { token, isLoggedIn } = useAuth();
   const { data: eventDetails, refetch } = useQuery(['event', eventId], () =>
      getEvent(eventId!, token),
   );

   const refetchEventDetails = () => {
      refetch();
   };

   if (eventDetails === undefined) {
      return <Spinner />;
   }

   if (eventDetails === null || !isLoggedIn) {
      return <Navigate to='..' relative='path' />;
   }

   const {
      name,
      description,
      dateFrom,
      dateTo,
      periodicity,
      isPublic,
      isOwner,
      list,
      inviteCode,
      owner,
   } = eventDetails;

   return (
      <P.EventInfoWrapper className={Classes.DARK}>
         <P.TitleSpan>
            <Button icon='edit' />
            <h1>{name}</h1>
            <Link to='..' relative='path'>
               Powrót{' '}
            </Link>
         </P.TitleSpan>
         <DescriptionSection description={description} />

         <P.EventTimeFrameWrapper>
            {!isOwner && (
               <>
                  <h2>
                     Organizator:{' '}
                     <b>
                        {owner.firstName} {owner.lastName}
                     </b>
                     <a href={`mailto:${owner.email}`}>
                        <Button icon='envelope' intent={Intent.PRIMARY} minimal />
                     </a>
                  </h2>
               </>
            )}

            <h4>
               Początek wydarzenia: {moment(dateFrom).format(C.dateFormat)}{' '}
               <Tag intent={Intent.PRIMARY} round>
                  {moment(dateFrom).format(C.dayNameFormat)}
               </Tag>
            </h4>
            <h4>
               Koniec wydarzenia: {moment(dateTo).format(C.dateFormat)}
               <Tag intent={Intent.PRIMARY} round>
                  {moment(dateTo).format(C.dayNameFormat)}
               </Tag>
            </h4>
         </P.EventTimeFrameWrapper>

         <PeriodicityTag periodicity={periodicity} />

         {isPublic && (
            <>
               <Divider />
               <ParticipantsSection
                  eventId={eventId!}
                  isOwner={isOwner}
                  inviteCode={inviteCode}
                  participantsList={list}
                  refetchEventDetails={refetchEventDetails}
               />
            </>
         )}

         <LeaveEventSection
            isOwner={isOwner}
            eventId={eventId!}
            eventName={eventDetails.name}
         />
      </P.EventInfoWrapper>
   );
};

export default EventView;
