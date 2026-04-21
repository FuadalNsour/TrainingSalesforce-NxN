import fs from 'fs';
import path from 'path';

export interface LabResponse {
  id: string;
  labId: string;
  labTitle: string;
  context: string;
  situation: string;
  question: string;
  userResponse: string;
  timestamp: string;
}

const RESPONSES_FILE = path.join(process.cwd(), 'data', 'lab_responses.json');

function ensureResponsesFile() {
  const dir = path.dirname(RESPONSES_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(RESPONSES_FILE)) {
    fs.writeFileSync(RESPONSES_FILE, JSON.stringify([], null, 2));
  }
}

export function saveLabResponse(response: Omit<LabResponse, 'id' | 'timestamp'>) {
  try {
    ensureResponsesFile();
    const responses: LabResponse[] = JSON.parse(fs.readFileSync(RESPONSES_FILE, 'utf-8'));

    const newResponse: LabResponse = {
      ...response,
      id: `${response.labId}-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    responses.push(newResponse);
    fs.writeFileSync(RESPONSES_FILE, JSON.stringify(responses, null, 2));

    return newResponse;
  } catch (error) {
    console.error('Error saving lab response:', error);
    throw error;
  }
}

export function getAllResponses(): LabResponse[] {
  try {
    ensureResponsesFile();
    const data = fs.readFileSync(RESPONSES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading lab responses:', error);
    return [];
  }
}
