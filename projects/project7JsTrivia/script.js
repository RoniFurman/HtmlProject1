const questionsBank = [
  {
    question: "What is the capital of France?",
    ansA: "Berlin",
    ansB: "Madrid",
    ansC: "Paris",
    ansD: "Rome",
    correctAns: "ansC",
  },
  {
    question: "Who is the President?",
    ansA: "Bibi Netanyahu",
    ansB: "Donuld Trump",
    ansC: "Vladimir Putin",
    ansD: "Xi Jinping",
    correctAns: "ansB",
  },
  {
    question: "Where is the Taj-Mahal?",
    ansA: "India",
    ansB: "Pakistan",
    ansC: "Bangladesh",
    ansD: "Nepal",
    correctAns: "ansA",
  },
  {
    question: "Where is Mount Everest?",
    ansA: "India",
    ansB: "Pakistan",
    ansC: "Bangladesh",
    ansD: "Nepal",
    correctAns: "ansD",
  },
];

const setQuestion = document.getElementById("question");
const setAnsA = document.getElementById("ansAText");
const setAnsB = document.getElementById("ansBText");
const setAnsC = document.getElementById("ansCText");
const setAnsD = document.getElementById("ansDText");
const setCorrect = document.getElementById("correct");

let currentQuestion = 0;

function loadQuestion() {
  setQuestion.innerHTML = questionsBank[currentQuestion].question;
  setAnsA.innerHTML = questionsBank[currentQuestion].ansA;
  setAnsB.innerHTML = questionsBank[currentQuestion].ansB;
  setAnsC.innerHTML = questionsBank[currentQuestion].ansC;
  setAnsD.innerHTML = questionsBank[currentQuestion].ansD;
  setCorrect.innerHTML = "";
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (selectedAnswer) {
    const ans = selectedAnswer.value;
    if (questionsBank[currentQuestion].correctAns === ans) {
      setCorrect.innerHTML = "Correct!";
    } else {
      setCorrect.innerHTML = "Wrong!";
    }
    setTimeout(() => {
      currentQuestion++;
      if (currentQuestion < questionsBank.length) {
        loadQuestion();
        selectedAnswer.checked = false;
      } else {
        setCorrect.innerHTML = "Quiz Over!";
      }
    }, 2000);
  } else {
    setCorrect.innerHTML = "Please select an answer!";
  }
}

function resetQuiz() {
  currentQuestion = 0;
  loadQuestion();
}

document.getElementById("submit").addEventListener("click", checkAnswer);
window.onload = loadQuestion;
document.getElementById("reset").addEventListener("click", resetQuiz);
