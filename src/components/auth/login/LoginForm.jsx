import React from 'react';
import InputRFH from '@/components/common/inputs/InputRFH';
import useRFH from '@/utils/hooks/global/useRFH';
import Btn from '@/components/common/buttons/Btn';
import useCustomMutation from '@/utils/hooks/global/useCustomMutation';
import useAuthApis from '@/backend helper/api calls/auth.apis';
import {
    loginDefaultValues as defaultValues,
    loginFields
} from '@/features/auth/configs';
import DemoCredentials from './DemoCredentials';
import { loginSchema as schema } from '@/utils/yup/loginSchema';
import useAuthSuccess from '@/utils/hooks/auth/useAuthSuccess';

export default function LoginForm() {
    const { register, errors, handleSubmit } = useRFH({
        schema,
        defaultValues
    });
    const { onLoginSuccess: onSuccess } = useAuthSuccess();
    const { loginFN: mutationFn } = useAuthApis();
    const { mutate, isPending } = useCustomMutation({ mutationFn, onSuccess });

    function onSubmit(data) {
        mutate(data);
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <DemoCredentials />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    {loginFields.map(field => (
                        <InputRFH
                            key={field.name}
                            register={register}
                            error={errors[field.name]?.message}
                            {...field}
                        />
                    ))}
                    <Btn type="submit" label="Submit" loading={isPending} />
                </form>
            </div>
        </div>
    );
}
