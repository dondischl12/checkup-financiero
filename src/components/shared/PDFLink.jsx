import { FileText, ExternalLink } from 'lucide-react'

export default function PDFLink({ titulo, descripcion, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-4 bg-white border border-blue-100 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all group"
    >
      <div className="mt-0.5 text-blue-500 shrink-0">
        <FileText size={20} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800 group-hover:text-blue-700">{titulo}</p>
        {descripcion && <p className="text-sm text-gray-500 mt-0.5">{descripcion}</p>}
      </div>
      <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-400 shrink-0 mt-1" />
    </a>
  )
}
