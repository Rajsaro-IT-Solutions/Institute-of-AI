type RememberMeCheckboxProps = {
  checked: boolean;
  error?: string;
  onCheckedChange: (checked: boolean) => void;
};

export default function RememberMeCheckbox({
  checked,
  error,
  onCheckedChange,
}: Readonly<RememberMeCheckboxProps>) {
  return (
    <label className="flex items-start gap-3 text-sm text-slate-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onCheckedChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-blue-500"
      />
      <span>
        Remember me on this device
        {error ? <span className="mt-1 block text-rose-600">{error}</span> : null}
      </span>
    </label>
  );
}