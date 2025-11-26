interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Función para procesar el contenido markdown
  const processMarkdown = (text: string) => {
    const parts: (string | React.ReactElement)[] = [];
    let lastIndex = 0;

    // Expresión regular para detectar texto en negrita (**texto**)
    const boldRegex = /\*\*(.*?)\*\*/g;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      // Agregar texto antes del match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Agregar texto en negrita
      parts.push(
        <strong key={match.index} className='font-semibold'>
          {match[1]}
        </strong>
      );

      lastIndex = match.index + match[0].length;
    }

    // Agregar el resto del texto
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  return (
    <div className='space-y-3'>
      {content.split("\n\n").map((paragraph, index) => {
        const trimmedParagraph = paragraph.trim();

        if (!trimmedParagraph) return null;

        return (
          <p key={index} className='leading-5'>
            {processMarkdown(trimmedParagraph)}
          </p>
        );
      })}
    </div>
  );
}
