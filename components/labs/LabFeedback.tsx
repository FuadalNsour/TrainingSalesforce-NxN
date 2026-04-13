import { Card } from '@/components/common/Card';

interface LabFeedbackProps {
  correctAnswer: string;
  explanation: string;
  keyLearnings: string[];
  userAnswer: string;
}

export function LabFeedback({
  correctAnswer,
  explanation,
  keyLearnings,
  userAnswer,
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

      {/* Expert Answer Section */}
      <Card className="bg-green-50 border border-green-200">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Response</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{correctAnswer}</p>
        </div>
      </Card>

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
