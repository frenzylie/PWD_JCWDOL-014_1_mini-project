import { useRouter } from 'next/router';

function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/logIn');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;