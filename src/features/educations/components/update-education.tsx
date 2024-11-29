import { Pen } from 'lucide-react';

import Button from '@/components/ui/button';
import { Form, FormDrawer, Input, Select, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { Authorization } from '@/lib/authorization';
import { EDUCATIONSTATUS, ROLES } from '@/types/enum';

import { useEducation } from '../api/get-education';
import {
    updateEducationInputSchema,
    useUpdateEducation,
} from '../api/update-education';

type UpdateEducationProps = {
    id: number;
};

export const UpdateEducation = ({ id }: UpdateEducationProps) => {
    const { addNotification } = useNotifications();
    const educationQuery = useEducation({ id });
    const updateEducationMutation = useUpdateEducation({
        mutationConfig: {
            onSuccess: () => {
                addNotification({
                    type: 'success',
                    title: 'Trường đã được cập nhật',
                });
            },
        },
    });

    const education = educationQuery?.data;

    return (
        <Authorization allowedRoles={[ROLES.ADMIN]}>
            <FormDrawer
                isDone={updateEducationMutation.isSuccess}
                triggerButton={
                    <Button buttonVariant="outlined">
                        <Pen className="size-4 text-info-700" />
                    </Button>
                }
                title="Cập nhật trường học"
                submitButton={
                    <Button
                        form="update-education"
                        type="submit"
                        buttonVariant="filled"
                        buttonStyled={{ color: 'primary', size: 'md', rounded: 'normal' }}
                        isLoading={updateEducationMutation.isPending}
                    >
                        Submit
                    </Button>
                }
            >
                <Form
                    id="update-education"
                    onSubmit={(values) => {
                        updateEducationMutation.mutate({
                            data: values,
                            id: education?.id ?? 0,
                        });
                    }}
                    options={{
                        defaultValues: {
                            name: education?.name ?? "",
                            email: education?.email ?? "",
                            phone: education?.phone ?? "",
                            address: education?.address ?? "",
                            status: education?.status ?? 1,
                        },
                    }}
                    schema={updateEducationInputSchema}
                >
                    {({ register, formState }) => (
                        <div className="py-4 flex-1">
                            <Input
                                label="Tên loại từ thiện"
                                error={formState.errors['name']}
                                registration={register('name')}
                            />
                            <Input
                                label="Email"
                                error={formState.errors['email']}
                                registration={register('email')}
                            />
                            <Input
                                label="Số điện thoại"
                                error={formState.errors['phone']}
                                registration={register('phone')}
                            />
                            <Input
                                label="Địa chỉ"
                                error={formState.errors['address']}
                                registration={register('address')}
                            />
                        </div>
                    )}
                </Form>
            </FormDrawer>
        </Authorization>
    );
};
