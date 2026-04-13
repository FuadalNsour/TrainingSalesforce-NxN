import { Card } from '@/components/common/Card';

interface LabFeedbackProps {
  correctAnswer: string;
  bestAnswer?: string;
  explanation: string;
  keyLearnings: string[];
  userAnswer: string;
  assessmentType?: 'scored' | 'feedback';
  scoringRubric?: {
    excellent: string;
    good: string;
    developing: string;
  };
}

export function LabFeedback({
  correctAnswer,
  bestAnswer,
  explanation,
  keyLearnings,
  userAnswer,
  assessmentType = 'feedback',
  scoringRubric,
}: LabFeedbackProps) {
  return (
    <div className="space-y-8">
      {/* Your Answer Section */}
      <Card className="bg-gray-50 border border-gray-200">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Your Response</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{userAnswer}</p>
        </div>
      </Card>

      {/* Scoring Rubric (if scored assessment type) */}
      {assessmentType === 'scored' && scoringRubric && (
        <Card className="bg-orange-50 border border-orange-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Scoring Rubric</h3>
            <div className="space-y-3">
              <div>
                <p className="font-bold text-orange-900">Excellent</p>
                <p className="text-gray-700 text-sm">{scoringRubric.excellent}</p>
              </div>
              <div>
                <p className="font-bold text-orange-900">Good</p>
                <p className="text-gray-700 text-sm">{scoringRubric.good}</p>
              </div>
              <div>
                <p className="font-bold text-orange-900">Developing</p>
                <p className="text-gray-700 text-sm">{scoringRubric.developing}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Expert Answer Section */}
      <Card className="bg-green-50 border border-green-200">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Response</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{correctAnswer}</p>
        </div>
      </Card>

      {/* Best Answer / Reference (if available) */}
      {bestAnswer && (
        <Card className="bg-cyan-50 border border-cyan-200">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Best Practice Reference</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{bestAnswer}</p>
          </div>
        </Card>
      )}

      {/* Explanation Section */}
      <Card className="bg-blue-50 border border-blue-200">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Why This Matters</h3>
          <p className="text-gray-700 mb-4">{explanation}</p>
        </div>
      </Card>

      {/* Key Learnings Section */}
      <Card className="bg-purple-50 border border-purple-200">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Key Takeaways</h3>
          <ul className="space-y-2">
            {keyLearnings.map((learning, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                <span className="text-gray-700">{learning}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
