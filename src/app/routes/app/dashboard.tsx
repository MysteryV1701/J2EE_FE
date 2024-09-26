import { ContentLayout } from '@/components/layouts';
import Button from '@/components/ui/button';
import { useUser } from '@/lib/auth';
// import { ROLES } from '@/lib/authorization';

export const DashboardRoute = () => {
  const user = useUser();
  return (
    <ContentLayout title="Dashboard" description="Admin of Happly Life Site">
      <div className="mb-10">
        <h1 className="text-xl">
          Welcome <b>{`${user.data?.fullname}`}</b>
        </h1>
        <h4 className="my-3">
          Your role is : <b>{user.data?.role}</b>
        </h4>
        <p className="font-medium">In this application you can:</p>
      </div>

      {/* {user.data?.role === ROLES.USER && (
        <ul className="my-4 list-inside list-disc">
          <li>Create comments in discussions</li>
          <li>Delete own comments</li>
        </ul>
      )}
      {user.data?.role === ROLES.ADMIN && (
        <ul className="my-4 list-inside list-disc">
          <li>Create discussions</li>
          <li>Edit discussions</li>
          <li>Delete discussions</li>
          <li>Comment on discussions</li>
          <li>Delete all comments</li>
        </ul>
      )} */}
      <Button
        buttonVariant="ghost"
        buttonStyled={{
          color: 'primary',
          vPadding: 'md',
          hPadding: 'md',
          rounded: 'normal',
        }}
      >
        Ghost Rider
      </Button>
    </ContentLayout>
  );
};
