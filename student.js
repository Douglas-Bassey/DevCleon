document.getElementById(`studFORM`).addEventListener('submit', function (e) {
    e.preventDefault();

    let studName = document.getElementById(`name`).ariaValueMax.trim();
    let overAll = 0;

    for (let i = 1; i <= 5; 1++) {
        overAll += Number(document.getElementById(`Score` + i).value);
    }

    let aveScore = overAll / 5;
    let grade;

    if (aveScore >= 70) {
        grade = "A";
    } else if (aveScore >= 60){
        grade = "B";
    } else if (aveScore >= 50){
        grade = "C";
    } else if (aveScore >= 45){
        grade = "D";
    } else if (aveScore >= 40){
        grade = "E"
    }else {
            grade = "F"
        }

    document.getElementsByClassName(`result`).innerHTML = `
    <p> Student: ${name}</p>
   <p> Average Score: ${aveScore.toFixed(2)}</p>
   <p> Grade: ${grade}</p> `
})