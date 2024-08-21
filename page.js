function calculateGPA() {
    const grades = document.querySelectorAll('.grade');
    const credits = [
        3, // Communicative English
        3, // Engineering Chemistry
        4, // Matrices and Calculus
        3, // Engineering Physics
        3, // Problem Solving and Python Programming
        1, // Heritage of Tamil
        2, // Physics and Chemistry Laboratory
        2, // Problem Solving and Python Programming Laboratory
        1  // Communicative English Laboratory
    ];

    let totalGradePoints = 0;
    let totalCredits = 0;

    grades.forEach((grade, index) => {
        totalGradePoints += parseFloat(grade.value) * credits[index];
        totalCredits += credits[index];
    });

    let gpa = totalGradePoints / totalCredits;

    document.getElementById('gpa').textContent = gpa.toFixed(2);
}
