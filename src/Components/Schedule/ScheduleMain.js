import React, { useState } from 'react';
import { Button, Modal, Input, DatePicker, Form, Select, message } from 'antd';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop';
import { createResizePlugin } from '@schedule-x/resize';
import { createEventModalPlugin } from '@schedule-x/event-modal';
import '@schedule-x/theme-default/dist/index.css';
import 'antd/dist/reset.css'; // Ant Design styles
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Option } = Select;

function ScheduleMain() {
  const eventModal = createEventModalPlugin();
  const eventsService = createEventsServicePlugin(); // Create event service

  // Initialize calendar
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [],
    plugins: [
      createDragAndDropPlugin(),
      eventsService, // Register events plugin
      createResizePlugin(),
      eventModal,
    ],
  });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();

  // Function to handle form submission
  const handleAddEvent = () => {
    form.validateFields().then((values) => {
      if (!calendar.eventsService) {
        message.error("Events service is not available.");
        return;
      }

      const { title, emails, dateTimeRange } = values;
      const start = dayjs(dateTimeRange[0]).format('YYYY-MM-DD HH:mm');
      const end = dayjs(dateTimeRange[1]).format('YYYY-MM-DD HH:mm');

      const newEvent = {
        id: String(Date.now()), // Unique ID
        title,
        start,
        end,
        emails, // Store emails as an array
      };

      calendar.eventsService.add(newEvent); // Add event dynamically
      message.success('Event added successfully!');

      form.resetFields();
      setShowModal(false);
    }).catch(errorInfo => {
      console.error("Validation Failed:", errorInfo);
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button type="primary" onClick={() => setShowModal(true)} style={{ marginBottom: '20px' }}>
        Add Event
      </Button>

      {/* Calendar Component */}
      <ScheduleXCalendar calendarApp={calendar} />

      {/* Modal for Adding Event */}
      <Modal
        title="Add New Event"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddEvent}>
            Save Event
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{ required: true, message: 'Please enter the event title!' }]}
          >
            <Input placeholder="Enter event title" />
          </Form.Item>

          <Form.Item
            name="emails"
            label="Emails (Multiple Users)"
            rules={[{ required: true, message: 'Please enter at least one email!' }]}
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Enter multiple emails"
            >
              {/* Users can dynamically add emails */}
            </Select>
          </Form.Item>

          <Form.Item
            name="dateTimeRange"
            label="Select Date & Time"
            rules={[{ required: true, message: 'Please select date and time!' }]}
          >
            <RangePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ScheduleMain;
