import showdown from 'showdown';

export default function NoteContent({ content }: { content: string }) {
  const converter = new showdown.Converter();
  const htmlContent = converter.makeHtml(content);
  return <div className="rounded-md bg-gray-50 p-4">
    <div className="prose" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
  </div>
}