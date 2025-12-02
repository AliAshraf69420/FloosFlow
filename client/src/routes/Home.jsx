import WelcomeCard from '../components/Home/WelcomeCard';
import Service from '../components/Home/services';
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
    return (
        <div className="pt-24 px-4 sm:px-8 flex flex-col items-center space-y-10 bg-ff-bg-dark pb-32">
            <WelcomeCard />
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