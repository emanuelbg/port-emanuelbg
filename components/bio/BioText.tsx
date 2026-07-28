export function BioText({ paragraphs }: { paragraphs: string[] }) {
  if (!paragraphs.length) return null
  return (
    <div className="space-y-3">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-sm text-muted leading-relaxed">{p}</p>
      ))}
    </div>
  )
}
