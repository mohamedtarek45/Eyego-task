import PDFDocument from "pdfkit";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const doc = new PDFDocument();
  const chunks = [];

  // استخدم خط موجود فعلاً بدل Helvetica
  const fontPath = path.join(process.cwd(), "public", "fonts", "Roboto-Regular.ttf");
  doc.registerFont("Roboto", fontPath);
  doc.font("Roboto");

  doc.on("data", (chunk) => chunks.push(chunk));

  doc.fontSize(20).text("User Table Data\n\n");
  const data = [
    { name: "Mohamed", age: 24 },
    { name: "Youssef", age: 25 },
  ];
  data.forEach((item, i) => {
    doc.text(`${i + 1}. ${item.name} - ${item.age} years old`);
  });

  doc.end();

  await new Promise((resolve) => doc.on("end", resolve));

  const pdfBuffer = Buffer.concat(chunks);

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="table-data.pdf"',
    },
  });
}
