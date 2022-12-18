export function RenderMarkdown({ children }: { children: string }) {
  return (
    <article
      className="prose lg:prose-xl"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
}
