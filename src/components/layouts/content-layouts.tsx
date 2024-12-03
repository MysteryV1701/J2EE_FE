import * as React from 'react';

import { Head } from '../seo';
import { Navbar } from '../ui/partials/navbar';
import Footer from '../ui/partials/footer';
import { useNotifications } from '../ui/notifications';
import { useUser } from '@/lib/auth';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  isDashboard?: boolean;
  isBackgroundClient?: boolean;
};

export const ContentLayout = ({
  children,
  title,
  description,
  isDashboard = false,
  isBackgroundClient = false,
}: ContentLayoutProps) => {
  const { addNotification } = useNotifications();
  const user = useUser();

  React.useEffect(() => {
    if (user?.data?.id) {
      const id = user?.data?.id;
      const socket = new SockJS('http://localhost:8090/api/ws');
      const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient.subscribe(`/user/${id}/notifications`, (response) => {
            console.log(response);
            addNotification({
              type: 'info',
              title: JSON.parse(response.body).title,
              message: JSON.parse(response.body).message,
            });
          });
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        },
      });

      stompClient.activate();
      return () => {
        stompClient.deactivate();
      };
    }
  }, [addNotification, user]);

  return (
    <>
      {isDashboard ? (
        <>
          <Head title={title} description={description} />
          <div className="px-4 py-4 relative">
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            <div className="py-2">{children}</div>
          </div>
        </>
      ) : (
        <>
          <Head title={title} description={description} />
          {isBackgroundClient && <div className="background-client"></div>}
          <div className="lg:px-20 px-2 py-4 relative">
            <Navbar />
            <div className="px-4">{children}</div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};
