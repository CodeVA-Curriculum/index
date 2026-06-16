// place files you want to import through the `$lib` alias in this folder.
export const dashboardURL = "https://localhost:5173/account"
// export const dashboardURL = "https://portal.codevirginia.org/dashboard"
export const loginURL = "https://portal.codevirginia.org/auth/redirect?redirect_url=http://localhost:5173/login"

export function getGradeStyle(el) {
  if(el.gradesAbbr == "K-12") { return "gk12" }
  if(el.grades.filter((grade) => ["K", "1", "2"].includes(String(grade.abbr))).length > 0) { return "gk2" }
  if(el.grades.filter((grade) => ["3", "4", "5"].includes(String(grade.abbr))).length > 0) { return "g35" }
  if(el.grades.filter((grade) => ["6", "7", "8"].includes(String(grade.abbr))).length > 0) { return "g68" }
  if(el.grades.filter((grade) => ["9", "10", "11", "12"].includes(String(grade.abbr))).length > 0) { return "g912" }
}

