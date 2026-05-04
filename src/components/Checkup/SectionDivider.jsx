export default function SectionDivider({ title, subtitle }) {
  return (
    <div className="py-4 mb-2">
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <div className="text-center">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{title}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
    </div>
  )
}
