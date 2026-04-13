'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getLabById } from '@/lib/labs-data';
import { LabScenario } from '@/components/labs/LabScenario';
import { LabFeedback } from '@/components/labs/LabFeedback';
import { Button } from '@/components/common/Button';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

export default function LabDetailPage() {
  const params = useParams();
  const [labId, setLabId] = useState<string>('');
  const [lab, setLab] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.labId) {
      const id = typeof params.labId === 'string' ? params.labId : '';
      setLabId(id);
      setLab(getLabById(id));
      setIsLoading(false);
    }
  }, [params]);

  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-600">Loading lab...</p>
      </div>
    );
  }

  if (!lab) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Lab not found</h1>
        <p className="text-gray-600 mb-6">The lab you're looking for doesn't exist.</p>
        <Link href={ROUTES.labs}>
          <Button variant="primary">Back to Labs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link href={ROUTES.labs} className="text-green-600 hover:text-green-700 mb-6 inline-block">
        ← Back to Labs
      </Link>

      {!submitted ? (
        <>
          <LabScenario lab={lab} />
          <div className="mt-8">
            <h3 className="font-bold text-gray-900 mb-4">Your Response</h3>
            <textarea
              className="w-full p-4 border border-gray-300 rounded text-gray-900 focus:outline-none focus:border-green-600"
              rows={6}
              placeholder="Write your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <Button
              variant="primary"
              size="lg"
              className="mt-4"
              onClick={() => setSubmitted(true)}
            >
              Submit Response
            </Button>
          </div>
        </>
      ) : (
        <>
          <LabFeedback
            correctAnswer={lab.correctAnswer}
            bestAnswer={lab.bestAnswer}
            explanation={lab.explanation}
            keyLearnings={lab.keyLearnings}
            userAnswer={userAnswer}
            assessmentType={lab.assessmentType}
            scoringRubric={lab.scoringRubric}
          />

          <div className="mt-8 flex gap-4">
            <Button variant="primary" onClick={() => window.location.reload()}>
              Try Another Lab
            </Button>
            <Link href={ROUTES.labs}>
              <Button variant="secondary">Back to Labs</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
