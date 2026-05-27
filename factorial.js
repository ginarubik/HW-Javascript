const input = document.getElementById("numberInput");
const resultDiv = document.getElementById("result");

function factorial(n) {
    if (n < 0) return "A factorial nincs definiálva negatív számokra" +
        "";

    let result = 1;

    for (let i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}

// Próbáld "input" eseménnyel, hogy az eredmény valós időben frissüljön,amint a felhasználó beír egy számot

input.addEventListener("input", function () {
    const number = parseInt(input.value);

    if (isNaN(number)) {
        resultDiv.textContent = "";
        return;
    }

    resultDiv.textContent = `Factorial: ${factorial(number)}`;
});

// Tesztelés: "input" helyett "change"
// input.addEventListener("change", function () {
//     const number = parseInt(input.value);
//     resultDiv.textContent = `Factorial: ${factorial(number)}`;
// });