import createDOMPurify from 'dompurify';
import { parse } from 'marked';

const DOMPurify = createDOMPurify(window);
DOMPurify.setConfig({
  ALLOWED_ATTR: ['id', 'class', 'href', 'target', 'src', 'alt'], // Thêm các thuộc tính cần thiết
});
export type MDPreviewProps = {
  value: string;
};

export const MDPreview = ({ value = '' }: MDPreviewProps) => {
  return (
    <div
      className="prose prose-slate w-full p-2"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(parse(value) as string),
      }}
    />
  );
};
