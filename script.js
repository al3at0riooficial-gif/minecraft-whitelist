const SUPABASE_URL = "https://xxhlvypvgkfsxgwcanok.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_YyVV94dbqcs7GMclow6Muw_1j1cSr-L";
const STORAGE_KEY = "whitelist_submitted";

const captcha = document.getElementById("captcha");
const submitButton = document.getElementById("submitButton");
const usernameInput = document.getElementById("username");
const message = document.getElementById("message");

let verified = false;

captcha.addEventListener("click", () => {
    verified = !verified;

    if (verified) {
        captcha.classList.add("verified");
        submitButton.disabled = false;
    } else {
        captcha.classList.remove("verified");
        submitButton.disabled = true;
    }
});

submitButton.addEventListener("click", async () => {
    if (localStorage.getItem(STORAGE_KEY) === "true") {
        message.style.color = "#ff5c5c";
        message.textContent = "Só podes enviar o teu nome de utilizador uma vez. Contacta o administrador se precisares de ajuda.";
        return;
    }

    const username = usernameInput.value.trim();

    if (!username) {
        message.textContent = "Escreve primeiro o teu username.";
        return;
    }

    if (!verified) {
        message.textContent = "Confirma que não és um robô.";
        return;
    }

    message.textContent = "A enviar...";

    const response = await fetch(`${SUPABASE_URL}/whitelist_requests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Prefer": "return=minimal"
        },
        body: JSON.stringify({
            username: username
        })
    });

if (response.ok) {
    localStorage.setItem(STORAGE_KEY, "true");

    message.style.color = "#5cdb72";
    message.textContent = "Feito! Aguarda que o administrador te coloque na whitelist.";

    usernameInput.value = "";
    verified = false;
    captcha.classList.remove("verified");
    submitButton.disabled = true;
} else {
    const error = await response.text();
    console.log("Erro Supabase:", error);

    try {
        const errorData = JSON.parse(error);

        if (errorData.code === "23505") {
            message.style.color = "#ff5c5c";
            message.textContent = "Utilizador já registado";
        } else {
            message.style.color = "#ff5c5c";
            message.textContent = "Ocorreu um erro ao enviar.";
        }
    } catch {
        message.style.color = "#ff5c5c";
        message.textContent = "Ocorreu um erro ao enviar.";
    }
}
});