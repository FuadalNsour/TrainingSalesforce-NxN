import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { getAllResponses } from '@/lib/response-logger';

export async function GET(request: NextRequest) {
  // Check password
  const password = request.nextUrl.searchParams.get('pwd');
  const correctPassword = '7x.ae@fuad.alnsour';

  if (password !== correctPassword) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Get all user responses
  const responses = getAllResponses();

  // Create workbook with multiple sheets
  const workbook = new ExcelJS.Workbook();

  // Sheet 1: User Responses
  const responseSheet = workbook.addWorksheet('User Responses');
  responseSheet.columns = [
    { header: 'Lab ID', key: 'labId', width: 15 },
    { header: 'Lab Title', key: 'labTitle', width: 25 },
    { header: 'Context', key: 'context', width: 35 },
    { header: 'Situation', key: 'situation', width: 35 },
    { header: 'Question', key: 'question', width: 35 },
    { header: 'User Response', key: 'userResponse', width: 45 },
    { header: 'Timestamp', key: 'timestamp', width: 20 },
  ];

  // Style header row
  responseSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  responseSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0056FF' } };
  responseSheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };

  // Add response data
  responses.forEach((response) => {
    responseSheet.addRow({
      labId: response.labId,
      labTitle: response.labTitle,
      context: response.context,
      situation: response.situation,
      question: response.question,
      userResponse: response.userResponse,
      timestamp: new Date(response.timestamp).toLocaleString(),
    });
  });

  // Set row heights
  responseSheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) {
      row.height = 40;
    } else {
      row.height = 60;
    }
    row.alignment = { wrapText: true, vertical: 'top' };
  });

  // Sheet 2: Summary Statistics
  const summarySheet = workbook.addWorksheet('Summary');
  summarySheet.columns = [
    { header: 'Metric', key: 'metric', width: 30 },
    { header: 'Value', key: 'value', width: 20 },
  ];

  const uniqueLabs = [...new Set(responses.map((r) => r.labId))].length;
  const totalResponses = responses.length;
  const dateRange =
    responses.length > 0
      ? `${new Date(responses[0].timestamp).toLocaleDateString()} - ${new Date(responses[responses.length - 1].timestamp).toLocaleDateString()}`
      : 'N/A';

  summarySheet.addRows([
    { metric: 'Total Responses', value: totalResponses },
    { metric: 'Unique Labs Attempted', value: uniqueLabs },
    { metric: 'Date Range', value: dateRange },
    { metric: 'Export Date', value: new Date().toLocaleString() },
  ]);

  summarySheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  summarySheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0056FF' } };

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
