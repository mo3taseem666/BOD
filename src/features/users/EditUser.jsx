import Modal from '@/components/common/form/Modal';
import ModalHeader from '@/components/common/form/ModalHeader';
import React from 'react';
import FormUser from './FormUser';
import useUsersApis from '@/backend helper/api calls/users.apis';
import { errorHanlder } from '@/backend helper/handlers/errorHandler';

export default function EditUser({ oldData, onClose }) {
    const { updateUser: mutationFn } = useUsersApis();

    const onSuccess = data => {
        console.log('data', data);
        onClose();
    };

    const onError = error => {
        console.log('error', error.message);
        errorHanlder(error.message);
    };

    return (
        <Modal setIsOpen={onClose}>
            <ModalHeader onClose={onClose} header="Edit User" />
            <FormUser
                mutationFn={mutationFn}
                onSuccess={onSuccess}
                onError={onError}
                oldData={oldData}
                editMode={true}
            />
        </Modal>
    );
}
