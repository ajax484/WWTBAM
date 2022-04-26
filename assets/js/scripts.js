// const SAMPLE_QUESTIONS = [
//     {
//         question: 'What is the capital of the United States?',
//         answer: 'Washington, D.C.',
//         options: [
//             'Washington, D.C.',
//             'New York',
//             'Los Angeles',
//             'Chicago'
//         ]
//     },
//     {
//         question: 'What is the capital of Canada?',
//         answer: 'Ottawa',
//         options: [
//             'Toronto',
//             'Vancouver',
//             'Montreal',
//             'Ottawa',
//         ]
//     },
//     {
//         question: 'What is the capital of France?',
//         answer: 'Paris',
//         options: [
//             'Lyon',
//             'Paris',
//             'Marseille',
//             'Toulouse'
//         ]
//     },
//     {
//         question: 'What is the capital of Germany?',
//         answer: 'Berlin',
//         options: [
//             'Munich',
//             'Hamburg',
//             'Berlin',
//             'Frankfurt'
//         ]
//     },
//     {
//         question: 'What is the capital of Italy?',
//         answer: 'Rome',
//         options: [
//             'Milan',
//             'Rome',
//             'Naples',
//             'Turin'
//         ]
//     },
//     {
//         question: 'What is the capital of Japan?',
//         answer: 'Tokyo',
//         options: [
//             'Tokyo',
//             'Osaka',
//             'Kyoto',
//             'Nagoya'
//         ]
//     },
//     {
//         question: 'What is the capital of the United Kingdom?',
//         answer: 'London',
//         options: [
//             'Manchester',
//             'Liverpool',
//             'Birmingham',
//             'London',
//         ]
//     },
//     {
//         question: 'What is the capital of Nigeria?',
//         answer: 'Abuja',
//         options: [
//             'Abuja',
//             'Lagos',
//             'Kano',
//             'Port Harcourt'
//         ]
//     },
//     {
//         question: 'What is the capital of Ghana?',
//         answer: 'Accra',
//         options: [
//             'Takoradi',
//             'Accra',
//             'Kumasi',
//             'Tamale'
//         ]
//     },
//     {
//         question: 'What is the capital of Brazil?',
//         answer: 'Brasilia',
//         options: [
//             'Sao Paulo',
//             'Rio de Janeiro',
//             'Salvador',
//             'Brasilia'
//         ]
//     },
//     {
//         question: 'What is the capital of India?',
//         answer: 'New Delhi',
//         options: [
//             'Mumbai',
//             'Chennai',
//             'New Delhi',
//             'Kolkata'
//         ]
//     },
//     {
//         question: 'What is the capital of Argentina?',
//         answer: 'Buenos Aires',
//         options: [
//             'Cordoba',
//             'Rosario',
//             'Buenos Aires',
//             'La Plata'
//         ]
//     },
//     {
//         question: 'What is the capital of Spain?',
//         answer: 'Madrid',
//         options: [
//             'Barcelona',
//             'Madrid',
//             'Seville',
//             'Valencia'
//         ]
//     },
//     {
//         question: 'What is the capital of Egypt?',
//         answer: 'Cairo',
//         options: [
//             'Cairo',
//             'Alexandria',
//             'Giza',
//             'Memphis'
//         ]
//     },
//     {
//         question: 'What is the capital of China?',
//         answer: 'Beijing',
//         options: [
//             'Shanghai',
//             'Guanzhou',
//             'Taiwan',
//             'Beijing'
//         ]
//     },

// ];

let queries = ['easy', 'medium', 'hard']
let all = [];
let subres;

function decodeString(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
}

const options = document.querySelectorAll('.option');
const levels = document.querySelectorAll('.level');
const hiddenOption = document.querySelector('.hidden-option');
const levelIndicator = document.querySelector('.level-indicator');
const tester = document.querySelector('.tester');
const levelIndicatorTl = gsap.timeline();
const question = document.getElementById('question');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const option4 = document.getElementById('option4');
const menuToggle = document.querySelector('.menu-toggle');
const levelBoard = document.querySelector('.level-board');
const mainContainer = document.querySelector('.main-container');
const main = document.querySelector('.main');
const infoBar = document.querySelector('.info-bar__body');
const icons = document.querySelectorAll('.icon');
const img = document.querySelector('.img');
const loadingTl = gsap.timeline();
const tl = gsap.timeline({ paused: true });

function toggle() {
    menuToggle.classList.toggle('is-active');
    levelBoard.classList.toggle('level-board-toggle');
    main.classList.toggle('main-toggle');
}

function checkToggle() {
    if (!menuToggle.classList.contains('is-active')) {
        toggle();
    }
}

icons.forEach(icon => {
    icon.addEventListener('click', function () {
        if (icon.classList.contains('used')) { return }

        icon.classList.add('used');

        displayMessage3(icon.id, true);

        if (icon.id === 'phone') {
            setTimeout(() => {
                displayMessage3('calling friend...', false);
            }, 1500);

            setTimeout(() => {
                const reply = quiz.phoneProbSelect();
                displayMessage3(`Friend suggests: ${reply.option}, reliability: ${reply.reliability}`, false);
            }, 3000);
        }

        if (icon.id === "audience") {
            setTimeout(() => {
                displayMessage3('asking the audience...', false);
            }, 1500);

            setTimeout(() => {
                const reply = quiz.audienceProbSelect();;
                displayMessage3(`Audience align as: ${reply}`, false);
            }, 3000);
        }

        if (icon.id === "fiftyfifty") {
            setTimeout(() => {
                displayMessage3('removing two options and leaving the right one and one wrong one', false);
            }, 1500);

            setTimeout(() => {
                const reply = quiz.fiftyFiftyProbSelect(Array.from(options));
                displayMessage3(`Options removed: ${reply}`, false);
            }, 3000);
        }
    })
});

menuToggle.addEventListener('click', function () { toggle() })

function disableLinks(disable) {
    options.forEach(function (option) {
        option.disabled = disable && true || false;
    })
}

question.addEventListener('click', function () {
    document.querySelector('.option.active').classList.remove('active');
    hiddenOption.classList.add('active');
})

options.forEach((option) => {
    option.addEventListener('click', function () {
        if (!this.classList.contains('active')) {
            if (menuToggle.classList.contains('is-active')) {
                toggle();
            }
            document.querySelector('.option.active').classList.remove('active');
            this.classList.add('active');
            displayMessage2('selection', option.innerHTML)
        } else {
            disableLinks(true);
            this.classList.remove('active');
            hiddenOption.classList.add('active');
            quiz.checkAnswer(this);
        }
    })
})

const randomNum = (max, min) => Math.round(Math.floor(Math.random() * (max - min + 1)) + min);

const randomShuffleFn = () => Math.random() - .5;

const shuffleFn = (optionA, optionB) => Math.random() * (optionB.weight + optionA.weight) - optionA.weight;

class Quiz {
    constructor() {
        this.questions = [];
        this.initializeQuestions();
    }

    initializeQuestions() {
        let j = 0;

        queries.forEach(diff => {
            console.log(`https://opentdb.com/api.php?amount=5&difficulty=easy&type=${diff}`);
            fetch(`https://opentdb.com/api.php?amount=5&difficulty=${diff}&type=multiple`)
                .then((res) => res.json())
                .then(res => {
                    subres = res.results.map((questionItem, index) => {
                        const answer = decodeString(questionItem.correct_answer)
                        const options = [
                            ...questionItem.incorrect_answers.map(a => decodeString(a)),
                            answer
                        ]
                        return {
                            id: `${index}-${Date.now()}`,
                            question: decodeString(questionItem.question),
                            answer: answer,
                            options: options.sort(() => Math.random() - .5)
                        }
                    });

                    this.questions.push(...subres);
                    console.log(this.questions);
                })
                .finally(() => {
                    if (j !== 2) {
                        j++
                        return;
                    }

                    setTimeout(() => {
                        loadingTl.pause();
                        tl.play();
                    }, 1500);
                    this.questionIndex = 0;
                    this.score = 0;
                    this.displayQuestion();
                    displayMessage4(1);
                })
        });
    }

    displayQuestion() {
        this.question = this.questions[this.questionIndex];
        question.innerHTML = this.question.question;
        this.answer = this.question.answer;
        [option1.innerHTML, option2.innerHTML, option3.innerHTML, option4.innerHTML] = this.question.options;
    }

    phoneProbSelect() {
        let rusRou = [{ option: 'unsure', weight: 1, reliability: 'unsure' }];
        let weight, option, reliability;

        for (option of this.question.options) {
            if (option === this.answer) {
                weight = 8;
                reliability = randomNum(80, 50);
            } else {
                weight = 1;
                reliability = randomNum(60, 20);
            }
            rusRou.push({ option, weight, reliability })
        }

        rusRou.sort(randomShuffleFn).sort(shuffleFn);

        return rusRou[0];
    }

    audienceProbSelect() {
        const options = this.question.options.sort(randomShuffleFn);
        let audienceTotal = 100, answerChoice, choice, reply = "", option;

        answerChoice = randomNum(90, 40);
        audienceTotal -= answerChoice;

        for (option of options) {
            if (option === this.answer) {
                reply += `${this.answer}: ${answerChoice}% `;
            } else {
                choice = randomNum(audienceTotal * 0.5, audienceTotal * 0.33);
                audienceTotal -= choice;
                reply += `${option}: ${choice}% `;
            }
        }

        return reply;
    }

    fiftyFiftyProbSelect(options) {
        let reply = "";
        let newOptions = options.sort(randomShuffleFn).filter((option) => option.innerHTML !== this.answer).filter((option) => option.innerHTML !== "dummy");

        reply += newOptions[0].innerHTML + " " + newOptions[1].innerHTML;
        newOptions[0].innerHTML = newOptions[1].innerHTML = '';
        newOptions[0].disabled = newOptions[1].disabled = true;

        return reply;
    }

    nextQuestion() {
        if (!this.isEnded()) {
            disableLinks(false);
            this.questionIndex++;
            displayMessage4(this.questionIndex + 1);
            this.displayQuestion();
        }
    }

    checkAnswer(option) {
        if (option.innerHTML === this.answer) {
            this.score++;
            displayMessage1('correct', this.answer)
            correctAnswer(option);
            return true;
        } else {
            displayMessage1('wrong', this.answer)
            wrongAnswer(option, Array.from(options).filter(option => option.innerHTML === this.answer), this.questionIndex);
            return false;
        }
    }

    isEnded() {
        if (this.questionIndex === 14) {
            return true;
        } else {
            return false;
        }
    }
}

let x = 1;

function displayMessage1(type, answer) {
    infoBar.innerHTML += `
        <div class= "message row" >
            <p class="col-2 text-capitalize text-${type == 'correct' ? 'success' : type == 'wrong' ? 'danger' : 'warning'}">${type}:</p>
            <p class="col-10 text-left">${type == 'correct' ? 'You are correct, the answer is' : type == 'wrong' ? "Whoops, that isn't right, the answer is " : 'warning'} ${answer}</p>
        </div> 
    `;
}

function displayMessage2(type, answer) {
    infoBar.innerHTML += `
        <div class= "message row" >
            <p class="col-2 text-capitalize text-warning">${type}:</p>
            <p class="col-10 text-left">You selected ${answer}, Are you sure?</p>
        </div> 
    `;
}

function displayMessage3(lifeline, init) {
    infoBar.innerHTML += `
        <div class= "message row" >
            <p class="col-2 text-capitalize text-warning">Lifeline:</p>
            <p class="col-10 text-left">${init === true ? "Lifeline used:" : ""} ${lifeline}</p>
        </div> 
    `;
}

function displayMessage4(level) {
    let message;

    switch (level) {
        case 1:
            message = "And so we begin";
            break;

        case 5, 10:
            message = "You're safe";
            break;

        default:
            message = `current level: ${level}`
            break;
    }

    infoBar.innerHTML += `
        <div class= "message row" >
            <p class="col-2 text-capitalize text-warning">Level:</p>
            <p class="col-10 text-left">${message}</p>
        </div> 
    `;
}

function correctAnswer(params) {
    levelIndicatorTl
        .addLabel('start')
        .to(params, .5, { backgroundColor: "#28a745" }, 'start')
        .fromTo(params, .5, { backgroundColor: "#28a745" }, { backgroundColor: "#E0A747", repeat: 5, yoyo: true, repeatDelay: 0.5 }, 'start+=.5')
        .to(params, 1, { backgroundColor: "#28a745" }, 'start+=5')
        .to(params, 1, { backgroundColor: "#1724a6", onComplete: function () { levelIndicatorTl.set(params, { clearProps: "backgroundColor" }) } }, 'start+=6')
        .call(checkToggle, null, 'start+=2')
        .to(levelIndicator, 1, { top: `${levels[x++].offsetTop - 3}`, ease: 'power3.out' }, 'start+=2.5')
        .fromTo(levelIndicator.querySelector('.level-indicator__inner'), .75, { backgroundColor: "#1724a6" }, { backgroundColor: "#e7bc73", repeat: 5, repeatDelay: .25, yoyo: true }, 'start+=3.5')
        .to(levelIndicator.querySelector('.level-indicator__inner'), 1, { backgroundColor: "#1724a6", onComplete: function () { quiz.nextQuestion(); toggle() } }, 'start+=8.5')
}

function wrongAnswer(params1, params2, x) {
    levelIndicatorTl
        .addLabel('start')
        .call(toggle)
        .to(params2, .5, { backgroundColor: "#28a745" }, 'start')
        .fromTo(params2, .5, { backgroundColor: "#28a745" }, { backgroundColor: "#E0A747", repeat: -1, yoyo: true, repeatDelay: 0.5 }, 'start+=.5')
        .to(params1, .5, { backgroundColor: "#dc3545" }, 'start')
        .call(checkToggle, null, 'start+=6 ')
        .to(levelIndicator, 1, { top: `${levels[getSafe(x)].offsetTop - 3}`, ease: 'power3.out' }, 'start+=2.5')
        .to([levelIndicator, levelIndicator.querySelector('.level-indicator__inner')], 1, { backgroundColor: "#dc3545" }, 'start+=3.5')
}

function getSafe(level) {
    if (level <= 4) { return 0 }
    if (level <= 9) { return 4 }
    if (level <= 14) { return 9 }
}

const quiz = new Quiz();

window.addEventListener('DOMContentLoaded', function () {
    loadingTl.addLabel('start')
        .set(mainContainer, { visibility: "hidden" }, 'start')
        .set(img, { autoAlpha: 1 }, 'start')
        .from(img, 1, { scale: 1.5, yoyo: true, repeat: -1 })

    tl.addLabel('start')
        .call(toggle, null, 'start+=.5')
        .from(mainContainer, 1, { autoAlpha: 0 }, 'start+=.5')
        .to(img, 1, { autoAlpha: 0 }, 'start+=.5')
        .to(levelIndicator, 5, { top: `${levels[14].offsetTop - 3}`, onStart: () => disableLinks(true) }, 'start+=1')
        .to(levelIndicator, 2, { top: `${levels[0].offsetTop - 3}`, ease: 'power3.out', onComplete: () => { disableLinks(false) } }, 'start+=6')
        .call(toggle, null, 'start+=8')
})

