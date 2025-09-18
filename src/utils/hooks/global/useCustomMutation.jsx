import { errorHanlder } from '@/backend helper/handlers/errorHandler';
import { successMsg } from '@/backend helper/handlers/successHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useCustomMutation({
    mutationFn,
    mutationKey,
    queryKeys = [],
    onSuccess,
    onError,
    onSettled
}) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn,
        mutationKey,

        onSuccess: (data, variables, context) => {
            if (queryKeys && queryKeys.length > 0) {
                console.log('queryKeys', queryKeys);
                queryKeys.forEach(key => {
                    queryClient.invalidateQueries({ queryKey: [key] });
                });
            }
            if (onSuccess) {
                onSuccess(data, variables, context);
            } else {
                console.log('datadata', data, variables, context);
                successMsg();
            }
        },

        onError: (error, variables, context) => {
            if (onError) {
                onError(error, variables, context);
            } else {
                console.log('Mutation error:', error?.message);
                errorHanlder(error.message);
            }
        },

        onSettled: (data, error, variables, context) => {
            if (onSettled) {
                onSettled(data, error, variables, context);
            }
        }
    });

    return mutation;
}
