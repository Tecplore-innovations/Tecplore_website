import { CONFIRM_ITEMS, SHOW_CONFIRM_HIGHLIGHTS, type ConfirmId } from "@/lib/confirm";

/** Marks text in yellow until it is confirmed. See src/lib/confirm.ts. */
export default function Confirm({ id, children }: { id?: ConfirmId; children: React.ReactNode }) {
  if (!id || !SHOW_CONFIRM_HIGHLIGHTS || !(id in CONFIRM_ITEMS)) return <>{children}</>;
  return (
    <mark className="needs-confirm" title={CONFIRM_ITEMS[id].note}>
      {children}
    </mark>
  );
}
