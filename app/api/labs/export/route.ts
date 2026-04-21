import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';

export async function GET(request: NextRequest) {
  // Check password
  const password = request.nextUrl.searchParams.get('pwd');
  const correctPassword = '7x.ae@fuad.alnsour';

  if (password !== correctPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Import labs data
  const labsModule = await import('@/lib/labs-data');
  const labs = Object.values(labsModule.LABS);

  // Create workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Lab Responses');

  // Set columns
  worksheet.columns = [
    { header: 'Lab ID', key: 'id', width: 15 },
    { header: 'Lab Title', key: 'title', width: 30 },
    { header: 'Context', key: 'context', width: 40 },
    { header: 'Situation', key: 'situation', width: 40 },
    { header: 'Question', key: 'question', width: 40 },
    { header: 'Correct Answer', key: 'answer', width: 50 },
    { header: 'Best Practice', key: 'best', width: 50 },
  ];

  // Style header row
  worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0056FF' } };
  worksheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

  // Add data rows
  labs.forEach((lab: any) => {
    worksheet.addRow({
      id: lab.id,
      title: lab.title,
      context: lab.scenario.context,
      situation: lab.scenario.situation,
      question: lab.scenario.question,
      answer: lab.correctAnswer,
      best: lab.bestAnswer || 'N/A',
    });
  });

  // Set row heights
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.height = 40;
    } else {
      row.height = 60;
    }
    row.alignment = { wrapText: true, vertical: 'top' };
  });

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Return as download
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="Lab_Responses.xlsx"',
    },
  });
}
