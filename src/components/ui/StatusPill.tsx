export type StatusTone =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'shipped'
  | 'processing'
  | 'neutral';

const TONE_CLASS: Record<StatusTone, string> = {
  success: 'status-active',
  warning: 'status-pending',
  danger: 'status-inactive',
  info: 'status-paid',
  shipped: 'status-shipped',
  processing: 'status-processing',
  neutral: 'status-neutral',
};

export default function StatusPill({
  tone = 'neutral',
  children,
}: {
  tone?: StatusTone;
  children: React.ReactNode;
}) {
  return <span className={`status-pill ${TONE_CLASS[tone]}`}>{children}</span>;
}
