const modal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");

checkLogged();
// Logar no sistema
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  const checkSession = document.getElementById("session-check").checked;

  const account = getAccount(email);
  if (!account) {
    alert("opps! Verifique o usuário ou a senhyaa.");
    return;
  }
  if (account) {
    if (account.password !== password) {
      alert("opps! Verifique o usuário ou a senhyaa.");
      return;
    }
    saveSession(email, checkSession);

    window.location.href = "home.html";
  }
});

// CRIAR CONTA
document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email-create-input").value;
  const password = document.getElementById("password-create-input").value;

  if (email.length < 5) {
    alert("Preencha o campo com um e-mail válido.");
    return;
  }

  if (password.length < 4) {
    alert("Preencha a senha com no mínimo 4 dígitos");
    return;
  }

  saveAccount({
    login: email,
    password: password,
    transactions: [],
  });

  modal.hide();

  alert("Conta criada com sucesso.");
});

function checkLogged() {
  if (session) {
    sessionStorage.setItem("logged", session);
    logged = session;
  }
  if (logged) {
    saveSession(logged, session);

    window.location.href = "home.html";
  }
}

//Salvar conta no storage
function saveAccount(data) {
  localStorage.setItem(data.login, JSON.stringify(data));
}

//Salvar sessão do usuário
function saveSession(data, saveSession) {
  if (saveSession) {
    localStorage.setItem("session", data);
  }

  sessionStorage.setItem("logged", data);
}

//salvar a sessão do usuário
function getAccount(key) {
  const account = localStorage.getItem(key);
  if (account) {
    return JSON.parse(account);
  }
  return "";
}
