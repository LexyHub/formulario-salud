import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

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
        "flex flex-col rounded-sm border border-lexy-border-input cursor-pointer"
      )}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        className={clsx(
          "text-start p-4 grid grid-cols-[1fr_auto] items-start w-full border-b cursor-pointer",
          {
            "border-b-transparent": !expanded,
            "border-b-[#E6E6E6]": expanded,
          }
        )}
      >
        {title}
        {expanded ? (
          <ChevronUp className="size-6" />
        ) : (
          <ChevronDown className="size-6" />
        )}
      </button>
      {expanded && (
        <div
          id={contentId}
          className="p-4 text-start text-sm text-lexy-text-secondary leading-5 whitespace-pre-line"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function ContenidoDialog({ active, isapre }: Props) {
  const [expandedId, setExpandedId] = useState<number>(0);

  const toggleExpand = (id: number) =>
    setExpandedId(expandedId === id ? 0 : id);

  const preguntas = [
    {
      id: 1,
      title: "¿Qué se busca con el recurso?",
      content: `Nuestro objetivo con la interposición del recurso de protección en
tribunales es aumentar tu cobertura en salud mental equiparándola
a la misma cobertura que tienes en salud física.

Lo bueno de esta reclamación es que tendrás una cobertura similar
al GES, pero no estarás amarrado a los prestadores GES con que
trabaja tu Isapre y que se encuentran saturados. Tú y tus cargas
podrán elegir el psicólogo o psiquiatra con que mejor conecten;
además, en caso de verse agudizada la afección y de ser necesario
una hospitalización psiquiátrica, ocurrirá lo mismo, puedes tener
la libertad de elegir dónde y con quien atenderte.`,
    },
    {
      id: 2,
      title: "¿Cuál es el precio? ¿Cuál es el valor? ¿Tiene algún costo?",
      content: `Nuestro objetivo con la interposición del recurso de protección en
tribunales es aumentar tu cobertura en salud mental equiparándola
a la misma cobertura que tienes en salud física.

Lo bueno de esta reclamación es que tendrás una cobertura similar
al GES, pero no estarás amarrado a los prestadores GES con que
trabaja tu Isapre y que se encuentran saturados. Tú y tus cargas
podrán elegir el psicólogo o psiquiatra con que mejor conecten;
además, en caso de verse agudizada la afección y de ser necesario
una hospitalización psiquiátrica, ocurrirá lo mismo, puedes tener
la libertad de elegir dónde y con quien atenderte.`,
    },
    {
      id: 3,
      title: "¿Qué documentos necesito para reclamar?",
      content: `Nuestro objetivo con la interposición del recurso de protección en
tribunales es aumentar tu cobertura en salud mental equiparándola
a la misma cobertura que tienes en salud física.

Lo bueno de esta reclamación es que tendrás una cobertura similar
al GES, pero no estarás amarrado a los prestadores GES con que
trabaja tu Isapre y que se encuentran saturados. Tú y tus cargas
podrán elegir el psicólogo o psiquiatra con que mejor conecten;
además, en caso de verse agudizada la afección y de ser necesario
una hospitalización psiquiátrica, ocurrirá lo mismo, puedes tener
la libertad de elegir dónde y con quien atenderte.`,
    },
    {
      id: 4,
      title: "¿Hay algún plazo para reclamar?",
      content: "TBD",
    },
    {
      id: 5,
      title: "¿El pago es retroactivo?",
      content: "TBD",
    },
  ];

  if (active === "preguntas") {
    return (
      <DialogContent className="w-full max-w-[610px]">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-b-[#E6E6E6] font-medium leading-6">
            Preguntas frecuentes
          </DialogTitle>
          <div className="py-4 flex flex-col w-full space-y-2">
            {preguntas.map(({ id, title, content }) => (
              <Collapsable
                key={id}
                id={id}
                expandedId={expandedId}
                onToggle={toggleExpand}
                title={title}
              >
                {content}
              </Collapsable>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    );
  }

  if (active === "documentos") {
    return (
      <DialogContent className="bg-white font-archivo">
        <DialogHeader className="text-left">
          <DialogTitle className="pb-4 border-b border-b-[#E6E6E6] font-medium leading-6">
            Documentos necesarios
          </DialogTitle>
          <div className="py-4 flex flex-col w-full space-y-2 text-sm leading-5 text-lexy-text-secondary">
            <p>Los documentos que necesitarás para este proceso son:</p>
            <ul className="list-disc w-fit flex flex-col items-start px-8">
              <li>
                Tu <span className="text-lexy-primary">Plan de salud</span>
              </li>
              <li>
                Tu{" "}
                <span className="text-lexy-primary">
                  Certificado de afiliación
                </span>
              </li>
            </ul>
            {isapre && (
              <>
                <p className="mb-4 mt-12 text-start text-sm">
                  Si deseas descargarlos ahora, puedes acceder a ellos desde el
                  portal de {isapre.name}.
                </p>
                <a
                  className="w-full text-center text-lexy-primary underline underline-offset-4"
                  href={isapre.url}
                >
                  [ Ir al portal de {isapre.name} ]
                </a>
              </>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    );
  }
}
