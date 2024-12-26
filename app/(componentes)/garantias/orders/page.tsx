'use client';

import * as React from 'react';
import { useNotifications } from '@toolpad/core/useNotifications';
import Button from '@mui/material/Button';

export default function BasicNotification() {
  const notifications = useNotifications();
  return (
    <div>
      <Button
        onClick={() => {
          // preview-start
          notifications.show('Consider yourself notified!', {
            autoHideDuration: 3000,
            severity: "success",
          });
          // preview-end
        }}
      >
        Notify me
      </Button>
    </div>
  );
}