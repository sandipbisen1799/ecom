export default function EmptyState({
  icon = 'fa-inbox',
  title = 'Nothing here yet',
  message,
}: {
  icon?: string;
  title?: string;
  message?: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <i className={`fa-solid ${icon}`} />
      </div>
      <h4>{title}</h4>
      {message && <p>{message}</p>}
    </div>
  );
}
