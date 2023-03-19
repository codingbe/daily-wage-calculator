const wageForm = document.querySelector("#wageForm");
const wageDatetime = wageForm.querySelector(".wageForm_datetime");
const todayWage = wageForm.querySelector(".today_wage");
const wageDashboard = document.querySelector("#wageDashboard");
const wageSum = wageDashboard.querySelector(".wage_sum");
const wageRemain = wageDashboard.querySelector(".wage_remain");
const MAX_WAGE = 2500000;
const wageRecordList = document.querySelector("#wageRecordList");
const wageUl = wageRecordList.querySelector("ul");
const resetButton = wageRecordList.querySelector("button");

function createList(datum) {
  const li = document.createElement("li");
  li.innerHTML = `${datum.datetime} <strong>${datum.wage}원</strong>`;
  wageUl.appendChild(li);
}

function init() {
  const data = loadData();
  data.forEach((datum) => {
    const li = document.createElement("li");
    li.innerHTML = `${datum.datetime} <strong>${datum.wage}원</strong>`;
    wageUl.appendChild(li);
  });
  updateDashboard();
}

function removeList() {
  wageUl.textContent = "";
}

function loadData() {
  return JSON.parse(localStorage.getItem("data")) || [];
}

function saveData(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

function resetInput(...input) {
  input.forEach((input) => (input.value = ""));
}

function wageSumCalculate() {
  const data = loadData();
  return data.reduce((prev, datum) => prev + datum.wage, 0);
}

function wageRemainCalculate() {
  const data = loadData();
  return data.reduce((prev, datum) => prev - datum.wage, MAX_WAGE);
}

function updateDashboard() {
  wageSum.textContent = `일급 합산: ${wageSumCalculate()}원`;
  wageRemain.textContent = `남은 금액: ${wageRemainCalculate()}원`;
}

function handleSubmit(e) {
  e.preventDefault();
  const data = loadData();
  const datetime = wageDatetime.value;
  const wage = Number(todayWage.value);
  if (datetime && wage) {
    const obj = { id: new Date(datetime).getTime(), datetime, wage };
    data.push(obj);
    saveData(data);
    createList(obj);
    resetInput(wageDatetime, todayWage);
    updateDashboard();
  }
}

init();
wageForm.addEventListener("submit", handleSubmit);

resetButton.addEventListener("click", () => {
  if (confirm("초기화 하시겠습니까?")) {
    localStorage.clear();
    updateDashboard();
    removeList();
  }
});
