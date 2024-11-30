import { FormCreatePost } from '@/app/components/formCreatePost';
import Modal from '@/app/components/modal';

export default function InterceptedLogin() {
  return (
    <Modal>
      <h2 className="mt-2">Create post</h2>
      <FormCreatePost isModalForm />
    </Modal>
  );
}
