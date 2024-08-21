const gradePoints = {
    'O': 10,
    'A+': 9,
    'A': 8,
    'B+': 7,
    'B': 6,
    'C+': 5,
    'C': 4,
    'U': 0
};

const grades = ['O', 'A+', 'A', 'B+', 'B', 'C+', 'C', 'U'];
let semesterCount = 0;

function addSemester() {
    semesterCount++;
    const semesterDiv = document.createElement('div');
    semesterDiv.classList.add('semester');
    semesterDiv.innerHTML = `
        <h3>Semester ${semesterCount}</h3>
        <div id="subjects-${semesterCount}">
            <!-- Subject input fields will be generated here -->
        </div>
        <button type="button" onclick="addSubjects(${semesterCount})">Add Subjects</button>
    `;
    document.getElementById('semesters').appendChild(semesterDiv);
}

function addSubjects(semester) {
    const subjectsDiv = document.getElementById(`subjects-${semester}`);
    subjectsDiv.innerHTML = ''; // Clear previous inputs if any
    const numSubjects = prompt("Enter the number of subjects (max 10):", "6");
    
    if (numSubjects <= 0 || numSubjects > 14 || isNaN(numSubjects)) {
        alert("Please enter a valid number of subjects (between 1 and 10).");
        return;
    }

    for (let i = 1; i <= numSubjects; i++) {
        subjectsDiv.innerHTML += `
            <div class="subject">
                <label for="credit-${semester}-${i}">Subject ${i} Credits:</label>
                <input type="number" id="credit-${semester}-${i}" placeholder="Credits" min="1" required>
                <label for="grade-${semester}-${i}">Subject ${i} Grade:</label>
                <select id="grade-${semester}-${i}" required>
                    ${grades.map(grade => `<option value="${grade}">${grade}</option>`).join('')}
                </select>
            </div>
        `;
    }
}

function calculateGPA() {
    const gpaResultsDiv = document.getElementById('gpa-results');
    const cgpaResultDiv = document.getElementById('cgpa-result');
    let totalPoints = 0;
    let totalCredits = 0;
    gpaResultsDiv.innerHTML = '';

    for (let i = 1; i <= semesterCount; i++) {
        const subjectsDiv = document.getElementById(`subjects-${i}`);
        const credits = [];
        const grades = [];

        subjectsDiv.querySelectorAll('.subject').forEach(subjectDiv => {
            const credit = parseFloat(subjectDiv.querySelector(`input[id^="credit-${i}"]`).value);
            const grade = subjectDiv.querySelector(`select[id^="grade-${i}"]`).value;

            if (!isNaN(credit) && credit > 0 && gradePoints[grade] !== undefined) {
                credits.push(credit);
                grades.push(grade);
            }
        });

        if (credits.length === 0 || grades.length === 0) {
            alert(`Please enter valid credits and grades for Semester ${i}.`);
            return;
        }

        let semesterPoints = 0;
        let semesterCredits = 0;

        for (let j = 0; j < credits.length; j++) {
            const credit = credits[j];
            const grade = grades[j];
            semesterPoints += gradePoints[grade] * credit;
            semesterCredits += credit;
        }

        const semesterGPA = semesterCredits ? (semesterPoints / semesterCredits).toFixed(2) : 0;
        gpaResultsDiv.innerHTML += `<p>GPA for Semester ${i}: ${semesterGPA}</p>`;

        totalPoints += semesterPoints;
        totalCredits += semesterCredits;
    }

    const cgpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    cgpaResultDiv.innerHTML = `<p>Overall CGPA: ${cgpa}</p>`;
}
