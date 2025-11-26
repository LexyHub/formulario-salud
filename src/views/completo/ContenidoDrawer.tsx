import { useState } from "react";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@components/base/Drawer";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import { faqs } from "@/lib/data/faq";
import MarkdownContent from "@components/ui/MarkdownContent";
import { useIsapres } from "@/hooks/useIsapres";

type Props = {
  active: "preguntas" | "documentos" | "";
  isapre?: { name: string; url: string };
};

interface CollapsableProps {
  id: number;
  expandedId: number;
  onToggle: (id: number) => void;
  title: string;
  children: React.ReactNode;
}

function Collapsable({
  id,
  expandedId,
  onToggle,
  title,
  children,
}: CollapsableProps) {
  const expanded = expandedId === id;
  const contentId = `collapsable-content-${id}`;

  return (
    <div
      onClick={() => onToggle(id)}
      className={clsx(
        "flex flex-col rounded-sm border border-lexy-border-input"
      )}>
      <button
        type='button'
        aria-expanded={expanded ? "true" : "false"}
        aria-controls={contentId}
        className={clsx(
          "text-start p-4 grid grid-cols-[1fr_auto] items-start w-full border-b",
          {
            "border-b-transparent": !expanded,
            "border-b-[#E6E6E6]": expanded,
          }
        )}>
        {title}
        {expanded ? (
          <ChevronUp className='size-6' />
        ) : (
          <ChevronDown className='size-6' />
        )}
      </button>
      {expanded && (
        <div
          id={contentId}
          className='p-4 text-start text-sm text-lexy-text-secondary leading-5 whitespace-pre-line'>
          {children}
        </div>
      )}
    </div>
  );
}

export default function ContenidoDrawer({ active, isapre }: Props) {
  const [expandedId, setExpandedId] = useState<number>(0);
  const { getIsapreByName } = useIsapres();
  const isapreWeb = getIsapreByName(isapre?.name || "");

  const toggleExpand = (id: number) =>
    setExpandedId(expandedId === id ? 0 : id);

  if (active === "preguntas") {
    return (
      <DrawerContent className='bg-white font-archivo overflow-hidden flex flex-col'>
        <DrawerHeader className='text-left shrink-0'>
          <DrawerTitle className='pb-4 border-b border-b-[#E6E6E6] font-medium leading-6'>
            Preguntas Frecuentes
          </DrawerTitle>
        </DrawerHeader>
        <div className='py-4 px-4 flex flex-col w-full space-y-2 overflow-y-auto flex-1'>
          {faqs.map(({ title, content }, index) => (
            <Collapsable
              key={index}
              id={index + 1}
              expandedId={expandedId}
              onToggle={toggleExpand}
              title={title}>
              <MarkdownContent content={content} />
            </Collapsable>
          ))}
        </div>
      </DrawerContent>
    );
  }

  if (active === "documentos") {
    return (
      <DrawerContent className='bg-white font-archivo overflow-hidden flex flex-col'>
        <DrawerHeader className='text-left shrink-0'>
          <DrawerTitle className='pb-4 border-b border-b-[#E6E6E6] font-medium leading-6'>
            Documentos necesarios
          </DrawerTitle>
        </DrawerHeader>
        <div className='py-4 px-4 flex flex-col w-full space-y-2 text-sm leading-5 text-lexy-text-secondary overflow-y-auto flex-1'>
          <p>Los documentos que necesitarás para este proceso son:</p>
          <ul className='list-disc w-fit flex flex-col items-start px-8'>
            <li>
              Tu <span className='text-lexy-primary'>Plan de salud</span>
            </li>
            <li>
              Tu{" "}
              <span className='text-lexy-primary'>
                Certificado de afiliación
              </span>
            </li>
          </ul>
          {isapre && (
            <>
              <p className='mb-4 mt-12 text-start text-sm'>
                Si deseas descargarlos ahora, puedes acceder a ellos desde el
                portal de {isapre.name}.
              </p>
              <a
                className='w-full text-center text-lexy-primary'
                href={isapreWeb?.url}
                target='_blank'
                rel='noopener noreferrer'>
                [ Ir al portal de {isapre.name} ]
              </a>
            </>
          )}
        </div>
      </DrawerContent>
    );
  }
}
