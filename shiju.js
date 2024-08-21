function calculateCGPA() {
    const semesterGPAs = [];
    for (let i = 1; i <= 8; i++) {
        const gpa = document.getElementById(`semester${i}`).value;
        if (gpa === "") {
            alert(`Please enter a GPA for Semester ${i}.`);
            return;
        }
        semesterGPAs.push(parseFloat(gpa));
    }

    const totalGPA = semesterGPAs.reduce((sum, gpa) => sum + gpa, 0);
    const cgpa = (totalGPA / 8).toFixed(2);
    
    document.getElementById('cgpa-result').textContent = `Your CGPA is: ${cgpa}`;
}
function frontpage() {
    window.location.href = 'front.html';
}