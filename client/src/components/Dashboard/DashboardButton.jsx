export default function DashboardButton({
  children,
  imgSrc,
  imgAlt = "",
  ...props
}) {
  return (
    <button className="ff-dashboard-btn px-4 py-2 my-6 " {...props}>
      {imgSrc && (
        <img src={imgSrc} alt={imgAlt} className="w-5 h-5 object-contain" />
      )}
      {children}
    </button>
  );
}
