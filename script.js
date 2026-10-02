const SUPABASE_URL = "https://xxhlvypvgkfsxgwcanok.supabase.co";
const SUPABASE_KEY = "sb_publishable_YyVV94dbqcs7GMclow6Muw_1j1cSr-L";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================
   ELEMENTOS
========================= */

const homePanel = document.getElementById("homePanel");
const loginPanel = document.getElementById("loginPanel");
const signupPanel = document.getElementById("signupPanel");
const accountPanel = document.getElementById("accountPanel");
const adminLoginPanel = document.getElementById("adminLoginPanel");
const adminPanel = document.getElementById("adminPanel");

const whitelistForm = document.getElementById("whitelistForm");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const adminLoginForm = document.getElementById("adminLoginForm");
const accountWhitelistForm = document.getElementById("accountWhitelistForm");

const message = document.getElementById("message");
const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");
const adminLoginMessage = document.getElementById("adminLoginMessage");
const accountWhitelistMessage = document.getElementById("accountWhitelistMessage");

const accountUsername = document.getElementById("accountUsername");
const adminRequests = document.getElementById("adminRequests");

const serverTab = document.getElementById("serverTab");
const requestTab = document.getElementById("requestTab");

const serverSection = document.getElementById("serverSection");
const requestSection = document.getElementById("requestSection");


/* =========================
   NAVEGAÇÃO
========================= */

function esconderTodos() {
    homePanel.classList.add("hidden");
    loginPanel.classList.add("hidden");
    signupPanel.classList.add("hidden");
    accountPanel.classList.add("hidden");
    adminLoginPanel.classList.add("hidden");
    adminPanel.classList.add("hidden");
}

function mostrarHome() {
    esconderTodos();
    homePanel.classList.remove("hidden");
}

function mostrarLogin() {
    esconderTodos();
    loginPanel.classList.remove("hidden");
}

function mostrarSignup() {
    esconderTodos();
    signupPanel.classList.remove("hidden");
}

function mostrarAdminLogin() {
    esconderTodos();
    adminLoginPanel.classList.remove("hidden");
}

function mostrarConta() {
    esconderTodos();
    accountPanel.classList.remove("hidden");
}

function mostrarAdmin() {
    esconderTodos();
    adminPanel.classList.remove("hidden");
}


/* =========================
   BOTÕES DE NAVEGAÇÃO
========================= */

document.getElementById("showLoginButton").addEventListener("click", mostrarLogin);
document.getElementById("showSignupButton").addEventListener("click", mostrarSignup);
document.getElementById("showAdminButton").addEventListener("click", mostrarAdminLogin);

document.getElementById("backFromLogin").addEventListener("click", mostrarHome);
document.getElementById("backFromSignup").addEventListener("click", mostrarHome);
document.getElementById("backFromAdmin").addEventListener("click", mostrarHome);

document.getElementById("goToSignup").addEventListener("click", mostrarSignup);
document.getElementById("goToLogin").addEventListener("click", mostrarLogin);


/* =========================
   WHITELIST PÚBLICA
========================= */

whitelistForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    message.textContent = "";
    message.className = "";

    const username = document
        .getElementById("minecraftUsername")
        .value
        .trim();

    const captcha = document.getElementById("captchaCheck").checked;

    if (!captcha) {
        message.textContent = "Confirma que não és um robô.";
        message.className = "error";
        return;
    }

    if (!username) {
        message.textContent = "Escreve o teu nome de Minecraft.";
        message.className = "error";
        return;
    }

    if (localStorage.getItem("whitelist_submitted") === "true") {
        message.textContent =
            "Só podes enviar o teu nome de utilizador uma vez. Contacta o administrador se precisares de ajuda.";
        message.className = "error";
        return;
    }

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/whitelist_requests`,
            {
                method: "POST",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify({
                    username: username
                })
            }
        );

        if (!response.ok) {
            let errorData = {};

            try {
                errorData = await response.json();
            } catch (_) {}

            if (errorData.code === "23505") {
                message.textContent = "Utilizador já registado.";
                message.className = "error";
                return;
            }

            throw new Error(errorData.message || "Erro ao enviar.");
        }

        localStorage.setItem("whitelist_submitted", "true");

        message.textContent =
            "Feito! Aguarda que o administrador te coloque na whitelist.";

        message.className = "success";

        document.getElementById("minecraftUsername").value = "";
        document.getElementById("captchaCheck").checked = false;

    } catch (error) {
        console.error(error);

        message.textContent =
            "Ocorreu um erro. Tenta novamente.";

        message.className = "error";
    }
});


/* =========================
   CRIAR CONTA
========================= */

signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    signupMessage.textContent = "";
    signupMessage.className = "";

    const username = document
        .getElementById("signupUsername")
        .value
        .trim();

    const email = document
        .getElementById("signupEmail")
        .value
        .trim();

    const password = document
        .getElementById("signupPassword")
        .value;

    const passwordConfirm = document
        .getElementById("signupPasswordConfirm")
        .value;

    if (password !== passwordConfirm) {
        signupMessage.textContent = "As passwords não coincidem.";
        signupMessage.className = "error";
        return;
    }

    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                }
            }
        });

        if (error) {
            throw error;
        }

        if (data.user && data.session) {
            await prepararPerfil(data.user);
        }

        signupMessage.textContent =
            "Conta criada! Verifica o teu email para confirmar a conta. O email pode demorar a chegar.";

        signupMessage.className = "success";

        signupForm.reset();

    } catch (error) {
        console.error(error);

        signupMessage.textContent =
            error.message || "Não foi possível criar a conta.";

        signupMessage.className = "error";
    }
});


/* =========================
   LOGIN
========================= */

loginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    loginMessage.textContent = "";
    loginMessage.className = "";

    const email = document
        .getElementById("loginEmail")
        .value
        .trim();

    const password = document
        .getElementById("loginPassword")
        .value;

    try {
        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {
            throw error;
        }

        if (!data.user) {
            throw new Error("Não foi possível entrar.");
        }

        await prepararPerfil(data.user);

        loginForm.reset();

        await atualizarConta(data.user);

    } catch (error) {
        console.error(error);

        loginMessage.textContent =
            error.message || "Email ou password incorretos.";

        loginMessage.className = "error";
    }
});


/* =========================
   PERFIL
========================= */

async function prepararPerfil(user) {
    const username =
        user.user_metadata?.username ||
        "Utilizador";

    const { error } = await supabaseClient
        .from("profiles")
        .insert({
            id: user.id,
            username: username
        });

    if (error && error.code !== "23505") {
        console.error("Erro ao criar perfil:", error);
    }
}


async function atualizarConta(user) {
    let username = user.user_metadata?.username;

    const { data, error } = await supabaseClient
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle();

    if (!error && data?.username) {
        username = data.username;
    }

    accountUsername.textContent = username || "Utilizador";

    mostrarConta();
}


/* =========================
   LOGOUT
========================= */

document.getElementById("logoutButton").addEventListener("click", async function() {
    await supabaseClient.auth.signOut();

    mostrarHome();
});


/* =========================
   TABS DA CONTA
========================= */

serverTab.addEventListener("click", function() {
    serverTab.classList.add("active");
    requestTab.classList.remove("active");

    serverSection.classList.remove("hidden");
    requestSection.classList.add("hidden");
});


requestTab.addEventListener("click", function() {
    requestTab.classList.add("active");
    serverTab.classList.remove("active");

    requestSection.classList.remove("hidden");
    serverSection.classList.add("hidden");
});


/* =========================
   PEDIR WHITELIST PELA CONTA
========================= */

accountWhitelistForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    accountWhitelistMessage.textContent = "";
    accountWhitelistMessage.className = "";

    const username = document
        .getElementById("accountMinecraftUsername")
        .value
        .trim();

    if (!username) {
        accountWhitelistMessage.textContent =
            "Escreve o teu nome de Minecraft.";

        accountWhitelistMessage.className = "error";
        return;
    }

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/whitelist_requests`,
            {
                method: "POST",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify({
                    username: username
                })
            }
        );

        if (!response.ok) {
            let errorData = {};

            try {
                errorData = await response.json();
            } catch (_) {}

            if (errorData.code === "23505") {
                accountWhitelistMessage.textContent =
                    "Utilizador já registado.";

                accountWhitelistMessage.className = "error";
                return;
            }

            throw new Error(errorData.message || "Erro ao enviar.");
        }

        accountWhitelistMessage.textContent =
            "Feito! Aguarda que o administrador te coloque na whitelist.";

        accountWhitelistMessage.className = "success";

        accountWhitelistForm.reset();

    } catch (error) {
        console.error(error);

        accountWhitelistMessage.textContent =
            "Ocorreu um erro. Tenta novamente.";

        accountWhitelistMessage.className = "error";
    }
});


/* =========================
   LOGIN ADMIN
========================= */

adminLoginForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    adminLoginMessage.textContent = "";
    adminLoginMessage.className = "";

    const email = document
        .getElementById("adminEmail")
        .value
        .trim();

    const password = document
        .getElementById("adminPassword")
        .value;

    try {
        const { data, error } =
            await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password
            });

        if (error) {
            throw error;
        }

        if (!data.user) {
            throw new Error("Não foi possível entrar.");
        }

        adminLoginForm.reset();

        await carregarPedidosAdmin();

        mostrarAdmin();

    } catch (error) {
        console.error(error);

        adminLoginMessage.textContent =
            error.message || "Email ou password incorretos.";

        adminLoginMessage.className = "error";
    }
});


/* =========================
   CARREGAR PEDIDOS ADMIN
========================= */

async function carregarPedidosAdmin() {
    adminRequests.innerHTML =
        "<p>A carregar pedidos...</p>";

    const {
        data: requests,
        error
    } = await supabaseClient
        .from("whitelist_requests")
        .select("*")
        .order("created_at", {
            ascending: false
        });

    if (error) {
        console.error(error);

        adminRequests.innerHTML =
            '<p class="error">Não foi possível carregar os pedidos.</p>';

        return;
    }

    if (!requests || requests.length === 0) {
        adminRequests.innerHTML =
            '<p class="empty-requests">Ainda não existem pedidos.</p>';

        return;
    }

    adminRequests.innerHTML = "";

    requests.forEach(request => {
        const card = document.createElement("div");
        card.className = "request-card";

        const top = document.createElement("div");
        top.className = "request-card-top";

        const username = document.createElement("div");
        username.className = "request-username";
        username.textContent = request.username;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Apagar";

        deleteButton.addEventListener("click", async function() {
            await apagarPedido(request.id);
        });

        top.appendChild(username);
        top.appendChild(deleteButton);

        const date = document.createElement("div");
        date.className = "request-date";

        if (request.created_at) {
            const data = new Date(request.created_at);

            date.textContent =
                data.toLocaleString("pt-PT");
        }

        card.appendChild(top);
        card.appendChild(date);

        adminRequests.appendChild(card);
    });
}


/* =========================
   APAGAR PEDIDO
========================= */

async function apagarPedido(id) {
    const { error } = await supabaseClient
        .from("whitelist_requests")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);

        alert("Não foi possível apagar o pedido.");
        return;
    }

    await carregarPedidosAdmin();
}


/* =========================
   LOGOUT ADMIN
========================= */

document.getElementById("adminLogoutButton").addEventListener("click", async function() {
    await supabaseClient.auth.signOut();

    mostrarHome();
});


/* =========================
   BOTÕES COPIAR
========================= */

document.querySelectorAll(".copy-button").forEach(button => {

    button.addEventListener("click", async function() {

        const text = button.dataset.copy;

        try {
            await navigator.clipboard.writeText(text);

            const originalText = button.textContent;

            button.textContent = "Copiado!";

            setTimeout(() => {
                button.textContent = originalText;
            }, 1200);

        } catch (error) {
            console.error(error);

            alert("Não foi possível copiar.");
        }
    });

});


/* =========================
   VERIFICAR SESSÃO
========================= */

async function verificarSessao() {

    const {
        data: {
            session
        }
    } = await supabaseClient.auth.getSession();

    if (!session) {
        mostrarHome();
        return;
    }

    const {
        data: {
            user
        }
    } = await supabaseClient.auth.getUser();

    if (!user) {
        mostrarHome();
        return;
    }

    await atualizarConta(user);
}


verificarSessao();