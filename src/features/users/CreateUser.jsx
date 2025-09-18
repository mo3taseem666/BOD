import Modal from '@/components/common/form/Modal';
import ModalHeader from '@/components/common/form/ModalHeader';
import React from 'react';
import FormUser from './FormUser';
import useUsersApis from '@/backend helper/api calls/users.apis';
import { errorHanlder } from '@/backend helper/handlers/errorHandler';

export default function CreateUser({ onClose }) {
    const { createUser: mutationFn } = useUsersApis();

    const onSuccess = (data) => {
        onClose();
    }

    const onError = (error) => {
        errorHanlder(error.message);
    }

    return (
        <Modal setIsOpen={onClose}>
            <ModalHeader onClose={onClose} header="Create New User" />
            <FormUser mutationFn={mutationFn} onSuccess={onSuccess} onError={onError} />
        </Modal>
    );
}
