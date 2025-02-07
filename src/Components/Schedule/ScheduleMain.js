import React, { useState,useEffect} from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { createResizePlugin } from '@schedule-x/resize'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import '@schedule-x/theme-default/dist/index.css'
function ScheduleMain() {
 const eventModal = createEventModalPlugin()
 const plugins = [
   createDragAndDropPlugin(),
   createEventsServicePlugin(),
   createResizePlugin()
   
]
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Qcc Project discussion',
        start: '2025-02-07 00:00',
        end: '2025-02-07 01:00',
      },
    ],
   plugins:[eventModal] 
  },plugins)
 
  // useEffect(() => {
  //   // get all events
  //   eventsService.getAll()
  // }, [])
  eventModal.close();
  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar}
        />
    </div>
  )
}

export default ScheduleMain
