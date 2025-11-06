import { Dialog } from "@components/ui/dialog";
import { Drawer } from "@components/ui/drawer";
import { useMediaQuery } from "@hooks/useMediaQuery";
import {
  CircleCheck,
  CircleHelp,
  Files,
} from "lucide-react";
import { useState } from "react";
import ContenidoDrawer from "./ContenidoDrawer";
import ContenidoDialog from "./ContenidoDialog";
import { useGlobalContext } from "@/contexts/GlobalContext";

export default function Completo() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState<boolean>(false);
  const [displayedContent, setDisplayedContent] = useState<"preguntas" | "documentos" | "">("");
  const { state } = useGlobalContext();

  const handleClick = (content: "preguntas" | "documentos" | "") => {
    setOpen(true);
    setDisplayedContent(content);
  };

  if (!localStorage.getItem("completo")) {
    localStorage.setItem("completo", JSON.stringify({ nombres: state.personalData.nombres, apellidos: state.personalData.apellidos, rut: state.personalData.rut })) 
  }

  return (
    <main className="grid grid-rows-[1fr_auto] xl:flex xl:items-center xl:justify-center min-h-dvh h-fit w-dvw font-archivo bg-white xl:bg-lexy-bg-secondary">
      <section className="flex flex-col items-center justify-center px-6 xl:max-w-3xl xl:w-full xl:space-y-9">
        <div className="flex flex-col items-center justify-center space-y-4 xl:space-y-0">
          <CircleCheck className="text-lexy-primary size-[68px] xl:size-[145px]" />
          <h1 className="text-center text-lexy-text text-xl xl:text-[32px] font-semibold leading-8 xl:leading-12">
            ¡Felicidades por dar el primer paso!
          </h1>
          <p className="text-center text-lexy-text-secondary text-sm xl:text-2xl leading-5 xl:leading-9">
            Aquí encontrarás lo que necesitas para prepararte. Revisa los
            documentos y aclara tus dudas antes de seguir
          </p>
        </div>
        <div className="hidden xl:flex xl:flex-col xl:space-y-4 xl:max-w-sm xl:w-full">
          <button
            type="button"
            onClick={() => handleClick("documentos")}
            className="cursor-pointer bg-lexy-primary w-full max-w-sm px-6 py-2.5 flex items-center justify-center text-white font-medium leading-6 rounded-sm"
          >
            <Files className="size-6 mr-2" />
            Ver documentos necesarios
          </button>
          <button
            type="button"
            onClick={() => handleClick("preguntas")}
            className="cursor-pointer border-2 border-lexy-primary w-full max-w-sm px-6 py-2.5 flex items-center justify-center text-lexy-primary font-medium leading-6 rounded-sm"
          >
            <CircleHelp className="size-6 mr-2" />
            Preguntas frecuentes
          </button>
        </div>
      </section>
      <footer className="w-full px-6 py-4 flex flex-col border-t border-t-[#E6E6E6] space-y-4 bg-white xl:hidden">
        <button
          type="button"
          onClick={() => handleClick("documentos")}
          className="cursor-pointer bg-lexy-primary w-full px-6 py-2.5 flex items-center justify-center text-white font-medium leading-6 rounded-sm"
        >
          <Files className="size-6 mr-2" />
          Ver documentos necesarios
        </button>
        <button
          type="button"
          onClick={() => handleClick("preguntas")}
          className="cursor-pointer border-2 border-lexy-primary w-full px-6 py-2.5 flex items-center justify-center text-lexy-primary font-medium leading-6 rounded-sm"
        >
          <CircleHelp className="size-6 mr-2" />
          Preguntas frecuentes
        </button>
      </footer>

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
            <ContenidoDrawer isapre={{ name: state.contactData.isapre || "", url: state.contactData.isapre || "" }} active={displayedContent} />
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <ContenidoDialog isapre={{ name: state.contactData.isapre || "", url: state.contactData.isapre || "" }} active={displayedContent} />
        </Dialog>
      )}
    </main>
  );
}
