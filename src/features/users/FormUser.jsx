import React from 'react';
import InputRFH from '@/components/common/inputs/InputRFH';
import { userFields } from './configs';
import Btn from '@/components/common/buttons/Btn';
import { userSchema as schema, updateUserSchema } from '@/utils/yup/userSchema';
import useRFH from '@/utils/hooks/global/useRFH';
import { userRoles } from '@/utils/constants/options';
import useCustomMutation from '@/utils/hooks/global/useCustomMutation';
import { userKeys } from '@/backend helper/configs/queryKeys';

export default function FormUser({
    mutationFn,
    onSuccess,
    onError,
    oldData,
    editMode = false,
    viewMode = false
}) {
    const { register, errors, handleSubmit, control } = useRFH({
        schema: editMode ? updateUserSchema : schema,
        defaultValues: oldData
    });

    const { mutate, isPending } = useCustomMutation({
        mutationFn,
        onSuccess,
        onError,
        queryKeys: [userKeys.users]
    });

    function onSubmit(data) {
        mutate({ id: oldData?._id, ...data });
    }

    const options = {
        roles: userRoles
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 p-5">
            {userFields
                .filter(
                    field =>
                        (editMode && field.editMode) ||
                        (viewMode && field.viewMode) ||
                        (!editMode && !viewMode)
                )
                .map(field => (
                    <InputRFH
                        control={control}
                        register={register}
                        error={errors[field.name]?.message}
                        key={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        label={field.label}
                        name={field.name}
                        options={options[field.optionsKey]}
                        defaultValue={oldData?.[field.name]}
                    />
                ))}
            <Btn loading={isPending} type="submit" label="Submit" />
        </form>
    );
}
