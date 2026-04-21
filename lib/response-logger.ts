import { getStore } from '@netlify/blobs';
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

const RESPONSES_KEY = 'lab_responses.json';
const LOCAL_FILE = path.join(process.cwd(), 'data', 'lab_responses.json');

function ensureLocalFile() {
  const dir = path.dirname(LOCAL_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_FILE)) {
    fs.writeFileSync(LOCAL_FILE, JSON.stringify([], null, 2));
  }
}

async function getResponses(): Promise<LabResponse[]> {
  try {
    const store = getStore('lab-responses');
    const data = await store.get(RESPONSES_KEY, { type: 'text' });
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading from Blobs:', error);
    return [];
  }
}

async function saveResponses(responses: LabResponse[]): Promise<void> {
  try {
    const store = getStore('lab-responses');
    const jsonString = JSON.stringify(responses, null, 2);
    const encoded = new TextEncoder().encode(jsonString);
    await store.set(RESPONSES_KEY, encoded as any);
  } catch (error) {
    console.error('Error writing to Blobs:', error);
    throw error;
  }
}

export async function saveLabResponse(response: Omit<LabResponse, 'id' | 'timestamp'>) {
  try {
    let responses: LabResponse[] = [];

    if (process.env.NODE_ENV === 'production') {
      responses = await getResponses();
    } else {
      ensureLocalFile();
      responses = JSON.parse(fs.readFileSync(LOCAL_FILE, 'utf-8'));
    }

    const newResponse: LabResponse = {
      ...response,
      id: `${response.labId}-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    responses.push(newResponse);

    if (process.env.NODE_ENV === 'production') {
      await saveResponses(responses);
    } else {
      fs.writeFileSync(LOCAL_FILE, JSON.stringify(responses, null, 2));
    }

    return newResponse;
  } catch (error) {
    console.error('Error saving lab response:', error);
    throw error;
  }
}

export async function getAllResponses(): Promise<LabResponse[]> {
  try {
    if (process.env.NODE_ENV === 'production') {
      return await getResponses();
    } else {
      ensureLocalFile();
      const data = fs.readFileSync(LOCAL_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading lab responses:', error);
    return [];
  }
}
