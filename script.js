
// =====================================
// CYBERSAFE - SECURITY AWARENESS PROJECT
// =====================================


// 1. SCROLL TO SECURITY MODULES

function showModules() {

    const modulesSection = document.getElementById("modules");

    if (modulesSection) {
        modulesSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// 2. MODULE INFORMATION


const modules = {

    phishing: {
        title: "Phishing",
        description: "Phishing is a cyberattack where attackers use fake emails, messages, or websites to steal sensitive information.",
        points: [
            "Check the sender's email address.",
            "Avoid clicking suspicious links.",
            "Never share passwords or OTPs.",
            "Verify website URLs before logging in."
        ],
        scenario: {
            question: "You receive an email claiming to be from your bank. It says your account will be blocked unless you click a link and verify your account details. What should you do?",
            options: [
                "Click the link and enter your banking details.",
                "Reply to the email asking if it is genuine.",
                "Avoid the link and contact your bank through its official website or number."
            ],
            correct: 2,
            explanation: "This email uses urgency to pressure you into clicking a potentially malicious link. Never use links in suspicious messages. Contact your bank through its official channels."
        }
    },

    pretexting: {
        title: "Pretexting",
        description: "Pretexting occurs when attackers create a fake identity or story to trick people into sharing confidential information.",
        points: [
            "Verify someone's identity before sharing information.",
            "Be careful with unexpected phone calls.",
            "Never reveal confidential details to strangers.",
            "Contact the organization through official channels."
        ],
        scenario: {
            question: "Someone calls you claiming to be from your college IT department. They say they need your login password to fix an urgent account problem. What should you do?",
            options: [
                "Share your password because they claim to be IT staff.",
                "Refuse to share your password and verify the request through the official IT department.",
                "Send your password through a message instead."
            ],
            correct: 1,
            explanation: "The caller may be using a fake identity to gain your trust. Never share your password. Verify unexpected requests through official channels."
        }
    },

    baiting: {
        title: "Baiting",
        description: "Baiting uses tempting offers, free downloads, or infected devices to trick victims into compromising their security.",
        points: [
            "Avoid unknown USB devices.",
            "Do not download files from suspicious websites.",
            "Be cautious of offers that seem too good to be true.",
            "Use trusted antivirus software."
        ],
        scenario: {
            question: "You find a USB drive labelled 'Free Movie Collection' outside your college computer lab. What is the safest action?",
            options: [
                "Plug it into your laptop to see what is inside.",
                "Give it to a friend to test.",
                "Do not connect it. Report or hand it over to the appropriate IT staff."
            ],
            correct: 2,
            explanation: "Unknown USB drives may contain malware. Connecting them can infect your device. Never plug in an unknown USB drive; report it to IT staff."
        }
    }

};

// 3. OPEN SELECTED MODULE


function openModule(moduleName) {

    const content = document.getElementById("module-content");

    const selectedModule = modules[moduleName];

    if (!content || !selectedModule) {
        return;
    }

    content.innerHTML = `
        <div class="module-details">

            <h2>${selectedModule.title}</h2>

            <p>${selectedModule.description}</p>

            <h3>Safety Tips</h3>

            <ul>
                ${selectedModule.points.map(point =>
                    `<li>${point}</li>`
                ).join("")}
            </ul>

            <div class="scenario-card">

                <h3>🎯 Interactive Scenario</h3>

                <p>${selectedModule.scenario.question}</p>

                <div class="scenario-options">
                    ${selectedModule.scenario.options.map((option, index) =>
                        `<button class="scenario-option"
                            onclick="checkScenarioAnswer('${moduleName}', ${index})">
                            ${option}
                        </button>`
                    ).join("")}
                </div>

                <div id="scenario-feedback"></div>

            </div>

            <button onclick="closeModule()">
                Close Module
            </button>

        </div>
    `;

    content.scrollIntoView({
        behavior: "smooth"
    });
        
}

function checkScenarioAnswer(moduleName, selectedOption) {

    const scenario = modules[moduleName].scenario;

    const feedback = document.getElementById("scenario-feedback");

    const buttons = document.querySelectorAll(".scenario-option");

    if (!feedback) return;

    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selectedOption === scenario.correct) {

        feedback.innerHTML = `
            <h4>✅ Correct Answer!</h4>
            <p>${scenario.explanation}</p>
        `;

    } else {

        feedback.innerHTML = `
            <h4>❌ Not Quite!</h4>
            <p>The safest response is:
            <strong>${scenario.options[scenario.correct]}</strong></p>
            <p>${scenario.explanation}</p>
        `;

    }

}



// 4. CLOSE SELECTED MODULE

function closeModule() {

    const content = document.getElementById("module-content");

    if (content) {
        content.innerHTML = "";
    }

}


// =====================================
// 5. INTERACTIVE CYBERSECURITY QUIZ
// =====================================


// Quiz questions


const quizQuestions = [

    {
        question: "What is phishing?",

        options: [
            "A type of computer hardware",
            "An attack using fake messages to steal information",
            "A method of securing passwords",
            "A software update"
        ],

        answer: 1,

        explanation: "Phishing is a cyberattack where attackers use fake emails, messages or websites to trick people into revealing sensitive information such as passwords, banking details or OTPs."
    },

    {
        question: "What should you do if you receive a suspicious email?",

        options: [
            "Click the link immediately",
            "Share your password",
            "Verify the sender before taking action",
            "Forward it to everyone"
        ],

        answer: 2,

        explanation: "Always verify the sender and inspect suspicious links before clicking or sharing personal information. This helps protect you from phishing attacks."
    },

    {
        question: "What is pretexting?",

        options: [
            "Creating a fake identity to obtain information",
            "Installing antivirus software",
            "Updating a computer",
            "Creating a strong password"
        ],

        answer: 0,

        explanation: "Pretexting involves creating a false identity or believable story to trick someone into revealing confidential information."
    },

    {
        question: "Which of these is an example of baiting?",

        options: [
            "Using two-factor authentication",
            "Receiving a security update",
            "Creating a password backup",
            "Leaving an infected USB drive for someone to use"
        ],

        answer: 3,

        explanation: "Baiting uses tempting offers or infected devices, such as USB drives, to trick victims into compromising their systems."
    },

    {
        question: "What should you do if someone asks for your OTP?",

        options: [
            "Share it if they sound trustworthy",
            "Never share it with anyone",
            "Post it online",
            "Send it through email"
        ],

        answer: 1,

        explanation: "OTPs are private security codes. Never share them, even with someone claiming to represent a bank or official organisation."
    }

];



// Quiz variables

let currentQuestion = 0;

let score = 0;

let hasAnswered = false;


// 6. START QUIZ

function startQuiz() {

    currentQuestion = 0;

    score = 0;

    hasAnswered = false;

    document.getElementById("quiz-result").innerHTML = "";

    displayQuestion();

}


// 7. DISPLAY QUESTION WITH PROGRESS BAR

function displayQuestion() {

    const quizArea = document.getElementById("quiz-area");

    if (!quizArea) return;

    hasAnswered = false;

    const questionData = quizQuestions[currentQuestion];

    // Calculate quiz progress

    const progress =
        ((currentQuestion + 1) / quizQuestions.length) * 100;

    quizArea.innerHTML = `

        <div class="quiz-card">

            <div class="quiz-progress-info">

                <span>Quiz Progress</span>

                <span>
                    ${currentQuestion + 1} / ${quizQuestions.length}
                </span>

            </div>


            <div class="quiz-progress-bar">

                <div class="quiz-progress-fill"
                     style="width: ${progress}%;">
                </div>

            </div>


            <h3>
                Question ${currentQuestion + 1}
                of ${quizQuestions.length}
            </h3>


            <h2>${questionData.question}</h2>


            <div class="quiz-options">

                ${questionData.options.map((option, index) => `

                    <button
                        class="quiz-option"
                        onclick="checkAnswer(${index})">

                        ${option}

                    </button>

                `).join("")}

            </div>


            <p id="quiz-feedback"></p>


            <button
                id="next-button"
                onclick="nextQuestion()"
                style="display:none;">

                Next Question

            </button>

        </div>

    `;

}


// 8. CHECK ANSWER


function checkAnswer(selectedOption) {

    if (hasAnswered) return;

    hasAnswered = true;

    const questionData = quizQuestions[currentQuestion];

    const feedback = document.getElementById("quiz-feedback");

    const options = document.querySelectorAll(".quiz-option");

    if (selectedOption === questionData.answer) {

        score++;

        feedback.innerHTML =
            "Correct! Excellent work!<br><br>" +
            "<strong>Why?</strong> " + questionData.explanation;

        feedback.style.color = "#00ff99";

    } else {

        feedback.innerHTML =
            "Incorrect! The correct answer is: " +
            questionData.options[questionData.answer] +
            "<br><br><strong>Why?</strong> " +
            questionData.explanation;

        feedback.style.color = "#ff6666";

    }

    options.forEach((button, index) => {

        button.disabled = true;

        if (index === questionData.answer) {

            button.style.borderColor = "#00ff99";

        }

    });

    document.getElementById("next-button").style.display = "block";

}


// 9. NEXT QUESTION

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {

        displayQuestion();

    } else {

        showQuizResult();

    }

}


// 10. DISPLAY FINAL RESULT


function showQuizResult() {

    const quizArea = document.getElementById("quiz-area");

    const result = document.getElementById("quiz-result");

    quizArea.innerHTML = "";

    const totalQuestions = quizQuestions.length;

    const percentage = Math.round((score / totalQuestions) * 100);

    const incorrectAnswers = totalQuestions - score;


    let performanceMessage = "";

    let performanceTitle = "";

    if (score === totalQuestions) {

        performanceTitle = "Outstanding!";

        performanceMessage = "You're a CyberSafe expert! Perfect score!";

    } else if (score >= 3) {

        performanceTitle = "Great Job!";

        performanceMessage = "You have a good understanding of social engineering. Keep learning!";

    } else {

        performanceTitle = "Keep Practising!";

        performanceMessage = "Don't give up! Continue learning about cybersecurity and stay alert.";

    }


    result.innerHTML = `

        <div class="quiz-card quiz-result-card">

            <h2>🎉 Quiz Completed!</h2>

            <h3 class="result-score">

                ${score} / ${totalQuestions}

            </h3>

            <h3>${percentage}% Accuracy</h3>

            <h3>${performanceTitle}</h3>

            <p>${performanceMessage}</p>

            <hr>

            <div class="result-stats">

                <p>✅ Correct Answers: ${score}</p>

                <p>❌ Incorrect Answers: ${incorrectAnswers}</p>

            </div>

            <div class="result-message">

                🛡️ Keep learning. Stay CyberSafe!

            </div>

            <button onclick="startQuiz()">

                Try Again

            </button>

        </div>

    `;

}

