export default function DashboardCard({ title, children, actions }) {
  return (
    <div className="w-full">
      <div className="ff-dashboard-card w-full my-5 flex flex-col items-center p-6 min-h-[450px]">
        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>

        {/* Content */}
        <div className="flex-1 w-full flex items-center justify-center">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="mt-4 flex gap-4 justify-center w-full">{actions}</div>
        )}
      </div>
    </div>
  );
}
