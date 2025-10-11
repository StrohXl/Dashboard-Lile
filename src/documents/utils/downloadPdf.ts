import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { RefObject } from "react";
export async function downloadPdf({
  refElement,
  documentId,
}: {
  refElement: RefObject<null | HTMLDivElement>;
  documentId: number;
}) {
  const element = refElement.current;

  if (element) {
    console.log(refElement);
    const canvas = await html2canvas(element, {
      scale: 3,
    });
    const data = canvas.toDataURL("image/png");

    const clientHeight = element.clientHeight;
    const clientWidth = element.clientWidth;

    const dpi = 96 * 3; // 96 DPI base × scale de 3
    const widthInInches = clientWidth / dpi;
    const heightInInches = clientHeight / dpi;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: [widthInInches,heightInInches],
    });


    pdf.addImage(data, "PNG", 0, 0, widthInInches, heightInInches);
    pdf.save(`document-${documentId}.pdf`);
  }
}
