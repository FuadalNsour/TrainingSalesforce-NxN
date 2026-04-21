import { getStore } from '@netlify/blobs';

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

export async function saveLabResponse(response: Omit<LabResponse, 'id' | 'timestamp'>) {
  try {
    const store = getStore('lab-responses');

    const existingData = await store.get(RESPONSES_KEY);
    let responses: LabResponse[] = [];

    if (existingData) {
      const text = new TextDecoder().decode(existingData);
      responses = JSON.parse(text);
    }

    const newResponse: LabResponse = {
      ...response,
      id: `${response.labId}-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    responses.push(newResponse);
    await store.set(RESPONSES_KEY, JSON.stringify(responses, null, 2));

    return newResponse;
  } catch (error) {
    console.error('Error saving lab response:', error);
    throw error;
  }
}

export async function getAllResponses(): Promise<LabResponse[]> {
  try {
    const store = getStore('lab-responses');
    const data = await store.get(RESPONSES_KEY);

    if (!data) {
      return [];
    }

    const text = new TextDecoder().decode(data);
    return JSON.parse(text);
  } catch (error) {
    console.error('Error reading lab responses:', error);
    return [];
  }
}
