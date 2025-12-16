import { useUser } from '../../context/UserContext';

const WelcomeCard = () => {
  const { user, loading, error } = useUser();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user info</p>;

  return (
    <section
      className="ff-card p-6 sm:p-10 flex flex-col sm:flex-row items-center
                 space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-5xl text-left"
    >
      <img
        src={user?.profileImage || '/mefr.webp'}
        alt="Profile Picture"
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-green-400 hover:scale-110 transition-transform duration-300"
      />
      <h1 className="text-xl sm:text-2xl font-bold">
        Welcome, {user ? `${user.firstName} ${user.lastName}` : 'Guest'}
      </h1>
    </section>
  );
};

export default WelcomeCard;
