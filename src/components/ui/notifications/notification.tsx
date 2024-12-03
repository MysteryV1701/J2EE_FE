import { cn } from '@/helpers/cn';
import { CircleX } from 'lucide-react';

export type NotificationProps = {
  notification: {
    id: string;
    type: 'info' | 'warning' | 'success' | 'danger';
    title: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  return (
    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
      <div
        className={cn(
          'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg border',
          type === 'danger' ? 'bg-danger-200 border-danger-200' : '',
          type === 'info' ? 'bg-info-200 border-info-200' : '',
          type === 'success' ? 'bg-success-200 border-success-200' : '',
          type === 'warning' ? 'bg-warning-200 border-warning-200' : '',
        )}
      >
        <div className="p-4" role="alert" aria-label={title}>
          <div className="flex items-start">
            <div className="shrink-0">
              <span
                className={cn(
                  `font-dancing text-5xl`,
                  type === 'danger' ? 'text-danger' : '',
                  type === 'info' ? 'text-info' : '',
                  type === 'success' ? 'text-success' : '',
                  type === 'warning' ? 'text-warning' : '',
                )}
              >
                D
              </span>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p
                className={cn(
                  `text-sm font-semibold `,
                  type === 'danger' ? 'text-danger-600' : '',
                  type === 'info' ? 'text-info-600' : '',
                  type === 'success' ? 'text-success-600' : '',
                  type === 'warning' ? 'text-warning-600' : '',
                )}
              >
                {title}
              </p>
              <p className="mt-1 text-sm text-gray-700">{message}</p>
            </div>
            <div className="ml-4 flex shrink-0">
              <button
                className="inline-flex rounded-md text-gray-900 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                onClick={() => {
                  onDismiss(id);
                }}
              >
                <span className="sr-only">Close</span>
                <CircleX className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
