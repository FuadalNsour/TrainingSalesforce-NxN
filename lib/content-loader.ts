import { Chapter, CourseMetadata } from './types';

export async function loadChapter(chapterId: string): Promise<Chapter> {
  const chapter = await import(`@/data/chapters/${chapterId}.json`);
  return chapter.default as Chapter;
}

export async function loadCourseMetadata(): Promise<CourseMetadata> {
  const metadata = await import('@/data/course-metadata.json');
  return metadata.default as CourseMetadata;
}
