const hamburger = document.querySelector('#ham-btn');
const menu = document.querySelector('#nav')

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('show');
    menu.classList.toggle('show');
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

const subjects = document.querySelector('#subjects');
const coursesContainer = document.querySelector('#courses');
const courseTotal = document.querySelector('#course-total');
let currentSubject = 'All';

subjects.innerHTML = `
    <button class="subject-btn" data-subject="All">All</button>
    <button class="subject-btn" data-subject="WDD">WDD</button>
    <button class="subject-btn" data-subject="CSE">CSE</button>
`;

function displayCourses(subject) {
    currentSubject = subject;
    coursesContainer.innerHTML = '';

    let selectedCourses = courses.filter(function (courseItem) {
        return subject === 'All' || courseItem.subject === subject;
    });

    courseTotal.textContent = `Total number of courses listed above is ${selectedCourses.length}`;

    for (let i = 0; i < courses.length; i++) {
        if (subject === 'All' || courses[i].subject === subject) {
            const completedClass = courses[i].completed ? ' completed' : '';
            coursesContainer.innerHTML += `<p class="course-item${completedClass}" data-index="${i}">${courses[i].subject} ${courses[i].number}</p>`;
        }
    }

    addCourseClickEvents();
}

displayCourses('All');

const subjectButtons = document.querySelectorAll('.subject-btn');

for (let i = 0; i < subjectButtons.length; i++) {
    subjectButtons[i].addEventListener('click', function () {
        displayCourses(this.dataset.subject);
    });
}

function addCourseClickEvents() {
    const courseItems = document.querySelectorAll('.course-item');

    for (let i = 0; i < courseItems.length; i++) {
        courseItems[i].addEventListener('click', function () {
            const courseIndex = Number(this.dataset.index);
            courses[courseIndex].completed = !courses[courseIndex].completed;
            displayCourses(currentSubject);
        });
    }
}

const currentYear = document.getElementById("currentyear");
currentYear.innerHTML = new Date().getFullYear();
const lastModified = document.getElementById("lastModified");

lastModified.innerHTML = `Last Modified: <span class="highlight">${new Intl.DateTimeFormat("en-US",{dateStyle: "full"}).format(new Date(document.lastModified))}</span>`;

