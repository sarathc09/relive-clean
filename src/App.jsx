import { motion } from "framer-motion";
import { ArrowRight, Activity, Brain, Heart, Moon } from "lucide-react";
import { useState } from "react";

const questions = [
{
question: "How many hours do you sleep?",
options: ["<5", "5-6", "7-8", "8+"]
},
{
question: "How many days do you exercise per week?",
options: ["0", "1-2", "3-4", "5+"]
},
{
question: "How would you rate your stress level?",
options: ["High", "Moderate", "Low"]
},
{
question: "How is your energy throughout the day?",
options: ["Poor", "Average", "Excellent"]
},
{
question: "How would you rate your diet quality?",
options: ["Poor", "Average", "Excellent"]
},
{
question: "How much water do you drink daily?",
options: ["<1L", "1-2L", "2-3L", "3L+"]
},
{
question: "Do you smoke?",
options: ["Yes", "Occasionally", "No"]
},
{
question: "How often do you consume alcohol?",
options: ["Frequently", "Occasionally", "Never"]
},
{
question: "How many steps do you walk daily?",
options: ["<3000", "3000-7000", "7000-10000", "10000+"]
},
{
question: "How often do you strength train?",
options: ["Never", "1-2x", "3-4x", "5+"]
}
];

export default function App() {
const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState([]);
const [showLeadForm, setShowLeadForm] = useState(false);
const [showResults, setShowResults] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const handleAnswer = (answer) => {
  const updatedAnswers = [...answers, answer];
  setAnswers(updatedAnswers);

  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    setShowLeadForm(true);
  }
};
const [showQuiz, setShowQuiz] = useState(false);
const calculateScore = () => {

  let score = 60;

  if (answers[0] === "7-8") score += 5;
  if (answers[1] === "5+") score += 5;
  if (answers[2] === "Low") score += 5;
  if (answers[6] === "No") score += 10;
  if (answers[7] === "Never") score += 5;

  return Math.min(score, 100);
};
const getRecommendations = () => {
  const recommendations = [];

  if (answers[0] === "<5") {
    recommendations.push("Increase sleep to 7-8 hours nightly");
  }

  if (answers[1] === "0" || answers[1] === "1-2") {
    recommendations.push("Exercise at least 3-4 times per week");
  }

  if (answers[2] === "High") {
    recommendations.push("Implement daily stress reduction practices");
  }

  if (answers[6] === "Yes") {
    recommendations.push("Smoking cessation should be your top priority");
  }

  if (answers[7] === "Frequently") {
    recommendations.push("Reduce alcohol consumption");
  }

  if (answers[8] === "<3000") {
    recommendations.push("Increase daily walking to 8,000+ steps");
  }

  if (answers[9] === "Never") {
    recommendations.push("Start strength training 2-3x weekly");
  }

  if (recommendations.length === 0) {
    recommendations.push("Maintain your current healthy lifestyle");
    recommendations.push("Continue regular exercise");
    recommendations.push("Monitor biomarkers annually");
  }

  return recommendations.slice(0, 5);
};
const getRisks = () => {
  const risks = [];

  if (answers[0] === "<5")
    risks.push("Sleep Optimization");

  if (answers[2] === "High")
    risks.push("Stress Management");

  if (answers[6] === "Yes")
    risks.push("Smoking Risk");

  if (answers[7] === "Frequently")
    risks.push("Alcohol Impact");

  if (answers[8] === "<3000")
    risks.push("Sedentary Lifestyle");

  return risks.length
    ? risks
    : ["Low Lifestyle Risk"];
};

const getStrengths = () => {
  const strengths = [];

  if (answers[0] === "7-8")
    strengths.push("Healthy Sleep");

  if (answers[1] === "5+")
    strengths.push("Active Lifestyle");

  if (answers[5] === "3L+")
    strengths.push("Excellent Hydration");

  if (answers[7] === "Never")
    strengths.push("Healthy Habits");

  if (answers[9] === "3-4x" || answers[9] === "5+")
    strengths.push("Strength Training");

  return strengths.length
    ? strengths
    : ["Improvement Potential"];
};

if (showResults) {

  const score = calculateScore();
  const recommendations = getRecommendations();
  const strengths = getStrengths();
  const risks = getRisks();

  const biologicalAge = 100 - score + 25;

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">

      <div className="max-w-3xl w-full bg-white/5 border border-white/10 rounded-3xl p-10">

        <h1 className="text-5xl font-bold text-center mb-4">
          {name}'s Longevity Report
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Personalized health insights based on your assessment.
        </p>

        <div className="text-center mb-8">
          <div className="text-7xl font-bold text-emerald-400">
            {score}
          </div>

          <div className="text-2xl">
            Longevity Score
          </div>

          <div className="text-gray-400 mt-2">
            Biological Age: {biologicalAge}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-emerald-500/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">
              Strengths
            </h2>

            {strengths.map((item, index) => (
              <p key={index}>✓ {item}</p>
            ))}
          </div>

          <div className="bg-red-500/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">
              Risks
            </h2>

            {risks.map((item, index) => (
              <p key={index}>⚠ {item}</p>
            ))}
          </div>

        </div>

        <div className="mt-8 bg-white/5 rounded-2xl p-6">

          <h2 className="text-xl font-bold mb-4">
            Recommended Actions
          </h2>

          {recommendations.map((item, index) => (
            <p key={index}>✓ {item}</p>
          ))}

<div className="mt-8 flex justify-center">
  <a
    href="https://relive.dayschedule.com/longevity-consultation"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button
      className="px-8 py-3 bg-emerald-500 rounded-xl text-lg font-semibold hover:scale-105 transition"
    >
      Claim Your Free Strategy Call →
    </button>
  </a>

</div>
        </div>

      </div>

    </div>
  );
}



if (showLeadForm) {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">

      <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">

        <h1 className="text-4xl font-bold mb-6">
          Get Your Personalized Report
        </h1>

        <p className="text-gray-400 mb-6">
          Enter your details to unlock your longevity report.
        </p>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl bg-black/30 border border-white/10 mb-4"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-black/30 border border-white/10 mb-6"
        />

        <button
  className="w-full p-4 bg-emerald-500 rounded-xl text-lg font-semibold hover:scale-105 transition"
  onClick={() => {

  if (!name.trim()) {
    alert("Please enter your name");
    return;
  }

  if (!email.trim()) {
    alert("Please enter your email");
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email");
    return;
  }

  const existingLeads =
    JSON.parse(localStorage.getItem("reliveLeads")) || [];

  existingLeads.push({
    name,
    email,
    answers,
    score: calculateScore(),
    createdAt: new Date().toISOString()
  });

  localStorage.setItem(
    "reliveLeads",
    JSON.stringify(existingLeads)
  );

  setShowLeadForm(false);
  setShowResults(true);
}}
>
  Generate My Report
</button>

      </div>

    </div>
  );
}
if (showQuiz) {

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-6">

      <div className="max-w-2xl w-full bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">

        <div className="w-full bg-white/10 rounded-full h-3 mb-8">
          <div
            className="bg-emerald-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-emerald-400 mb-4">
          Question {currentQuestion + 1} of {questions.length}
        </h2>

        <h1 className="text-4xl font-bold mb-8">
          {questions[currentQuestion].question}
        </h1>

        <div className="space-y-4">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full p-4 rounded-2xl bg-white/5 hover:bg-emerald-500 transition text-left"
            >
              {option}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
<nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

    <h1 className="text-2xl font-bold text-emerald-400">
      ReLive
    </h1>

    <div className="hidden md:flex gap-8">
      <a href="#assessment">Assessment</a>
      <a href="#benefits">Benefits</a>
      <a href="#pricing">Pricing</a>
    </div>

   <button
  onClick={() => setShowQuiz(true)}
  className="px-5 py-2 bg-emerald-500 rounded-full"
>
  Get Started
</button>

  </div>
</nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32">

        <div className="absolute inset-0 overflow-hidden">

  <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] animate-pulse" />

  <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />

  <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-emerald-400/10 rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2" />

</div>

        <div className="max-w-6xl mx-auto text-center relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
           <h1 className="text-6xl md:text-8xl font-bold mb-6">
  Discover How Fast
  <span className="text-emerald-400 block">
    You're Really Aging
  </span>
</h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measure your biological age, uncover hidden health risks, and receive a personalized longevity roadmap in under 3 minutes.
            </p>
<div className="mt-10 max-w-md mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">

  <div className="text-7xl font-bold text-emerald-400">
  78
</div>

<div className="text-2xl mt-2">
  Longevity Score
</div>

<div className="text-gray-400 mt-4">
  Biological Age: 28
</div>

</div>
            <button
  onClick={() => setShowQuiz(true)}
  className="mt-10 px-8 py-4 bg-emerald-500 rounded-full text-lg font-semibold flex items-center gap-2 mx-auto hover:scale-105 transition"
>
  Start Assessment
  <ArrowRight />
</button>
          </motion.div>
        </div>
      </section>
<section className="py-10 border-y border-white/10">
  <div className="max-w-6xl mx-auto text-center">

    <p className="text-gray-400 text-lg">
      Trusted by health-conscious professionals, founders and executives
    </p>

  </div>
</section>

      {/* Stats */}

      <section id="pricing" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h2 className="text-5xl font-bold text-emerald-400">
              100+
            </h2>
            <p className="mt-2 text-gray-400">
              Biomarkers Considered
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h2 className="text-5xl font-bold text-emerald-400">
              3 Min
            </h2>
            <p className="mt-2 text-gray-400">
              Assessment Time
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
            <h2 className="text-5xl font-bold text-emerald-400">
              92%
            </h2>
            <p className="mt-2 text-gray-400">
              Lifestyle Driven Aging
            </p>
          </div>

        </div>
      </section>
<section className="py-24 px-6">
  <div className="max-w-5xl mx-auto">

    <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">

      <h2 className="text-5xl font-bold text-center mb-10">
        ReLive Comprehensive Assessment
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <p className="text-xl mb-4">✓ 100+ Blood Biomarkers</p>
          <p className="text-xl mb-4">✓ Biological Age Analysis</p>
          <p className="text-xl mb-4">✓ Gene Insights</p>
          <p className="text-xl mb-4">✓ Gut Health Assessment</p>
          <p className="text-xl mb-4">✓ Nutrition Roadmap</p>
          <p className="text-xl mb-4">✓ Longevity Action Plan</p>
        </div>

        <div className="flex flex-col justify-center items-center">
<div className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full mb-4">
  Founder Pricing Available
</div>
          <div className="text-7xl font-bold text-emerald-400">
            ₹9,999
          </div>

          <p className="mt-4 text-gray-400">
            One-Time Comprehensive Assessment
          </p>

          <button className="mt-8 px-8 py-4 bg-emerald-500 rounded-full text-xl font-semibold">
            Book Consultation
          </button>

        </div>

      </div>

    </div>

  </div>
</section>
<section className="py-24 text-center">

  <h2 className="text-5xl font-bold mb-12">
    Why ReLive
  </h2>

  <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

    <div className="bg-white/5 p-8 rounded-3xl">
      <h3 className="text-2xl font-bold">
        Science Based
      </h3>
      <p>Evidence-backed longevity protocols.</p>
    </div>

    <div className="bg-white/5 p-8 rounded-3xl">
      <h3 className="text-2xl font-bold">
        Personalized
      </h3>
      <p>Unique recommendations for every individual.</p>
    </div>

    <div className="bg-white/5 p-8 rounded-3xl">
      <h3 className="text-2xl font-bold">
        Actionable
      </h3>
      <p>Practical steps you can implement immediately.</p>
    </div>

  </div>

</section>

      {/* Longevity Pillars */}

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-5xl font-bold text-center mb-16">
            Four Pillars of Longevity
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <Moon size={40} className="text-emerald-400 mb-4" />
              <h3 className="text-2xl font-semibold">Sleep</h3>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <Heart size={40} className="text-emerald-400 mb-4" />
              <h3 className="text-2xl font-semibold">Nutrition</h3>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <Activity size={40} className="text-emerald-400 mb-4" />
              <h3 className="text-2xl font-semibold">Movement</h3>
            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
              <Brain size={40} className="text-emerald-400 mb-4" />
              <h3 className="text-2xl font-semibold">Recovery</h3>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="py-32 px-6 text-center">

        <h2 className="text-6xl font-bold">
          Ready To Discover
          <span className="text-emerald-400 block">
            Your Longevity Score?
          </span>
        </h2>

        <button
  onClick={() => setShowQuiz(true)}
  className="mt-10 px-10 py-5 bg-emerald-500 rounded-full text-xl font-bold hover:scale-105 transition"
>
  Take Free Assessment
</button>

      </section>

    </div>
  );
}