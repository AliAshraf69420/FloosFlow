const Service = ({ label }) => {
  return (
    <div
      className="ff-card p-6 sm:p-10 flex items-center justify-center
                 w-full h-44 text-left"
    >
      <p className="font-semibold">{label}</p>
    </div>
  );
};

export default Service;
