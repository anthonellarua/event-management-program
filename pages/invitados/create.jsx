import InvitadoCreateForm from '@/components/InvitadoCreateForm';
import { useRouter } from 'next/router';

export default function CreateInvitado() {
  const router = useRouter();

  const handleSave = () => {
    router.push('/invitados');
  };

  return (
    <div>
      <h1>Agregar Invitado</h1>
      <InvitadoCreateForm onSave={handleSave} />
    </div>
  );
}
