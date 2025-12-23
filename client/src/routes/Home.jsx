import WelcomeCard from '../components/Home/WelcomeCard';
import CardSection from '../components/Home/CardSection';
import Service from '../components/Home/services';
import { useUser } from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/Notifications/LoadingSpinner';

const services = [
    'Service 1',
    'Service 2',
    'Service 3',
    'Service 4',
    'Service 5',
    'Service 6',
    'Service 7',
    'Service 8',
];

const Home = () => {
    const { user, loading, error } = useUser();
    const { fetchUser } = useUser();
    const navigate = useNavigate(); // to redirect after login

    if (loading) return LoadingSpinner();
    if (error) {
        console.error(error)
        navigate("/Error", { state: { error } })
    };
    return (
        <div className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-dark pb-32">
            {/* Pass user to child components if needed */}
            <WelcomeCard user={user} />
            <CardSection user={user} />
            <section
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4
                   gap-6 sm:gap-10 justify-items-center
                   w-full max-w-6xl"
            >
                {services.map((label) => (
                    <Service key={label} label={label} />
                ))}
            </section>

        </div>
    );
};

export default Home;
