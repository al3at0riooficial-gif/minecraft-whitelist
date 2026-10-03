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

const whitelistStatus = document.getElementById("whitelistStatus");
const whitelistStatusIcon = document.getElementById("whitelistStatusIcon");
const whitelistStatusTitle = document.getElementById("whitelistStatusTitle");
const whitelistStatusText = document.getElementById("whitelistStatusText");

let currentUser = null;


/* =========================
   IDIOMA
========================= */

const translations = {

    pt: {

        homeTitle: "MINECRAFT WHITELIST",
        homeSubtitle: "Entra na whitelist do nosso servidor",

        minecraftName: "Nome do Minecraft",
        notRobot: "Não sou um robô",
        submit: "Enviar",

        loginAccount: "Entrar na conta",
        createAccount: "Criar conta",
        adminLogin: "Entrar como administrador",

        loginTitle: "ENTRAR",
        loginSubtitle: "Entra na tua conta",

        email: "Email",
        password: "Password",
        login: "Entrar",
        back: "← Voltar",

        signupTitle: "CRIAR CONTA",
        signupSubtitle: "Cria uma conta para o servidor",
        username: "Nome de utilizador",
        confirmPassword: "Confirmar password",
        alreadyAccount: "Já tenho uma conta",

        hello: "OLÁ!",
        logout: "Sair",

        server: "Servidor",
        requestWhitelist: "Pedir Whitelist",
        serverInformation: "Informações do servidor",

        copy: "Copiar",
        port: "Porta: 20557",
        difficulty: "Dificuldade",
        version: "Versão",

        requestSubtitle:
            "Envia o teu nome de Minecraft para entrares na whitelist.",

        administrator: "ADMINISTRADOR",
        adminSubtitle: "Entra no painel de administração",
        adminPanel: "Painel de administração",

        whitelistRequests: "Pedidos de Whitelist",
        loadingRequests: "A carregar pedidos...",

        pending: "Pendente",
        approved: "Aprovado",
        rejected: "Recusado",

        pendingText:
            "O teu pedido está a aguardar aprovação.",

        approvedText:
            "Já podes entrar no servidor!",

        rejectedText:
            "O teu pedido foi recusado.",

        approve: "Aprovar",
        reject: "Recusar",
        delete: "Apagar",

        noRequests:
            "Ainda não existem pedidos.",

        adminLoadError:
            "Não foi possível carregar os pedidos.",

        captchaError:
            "Confirma que não és um robô.",

        emptyUsername:
            "Escreve o teu nome de Minecraft.",

        oneTime:
            "Só podes enviar o teu nome de utilizador uma vez. Contacta o administrador se precisares de ajuda.",

        duplicate:
            "Utilizador já registado.",

        success:
            "Feito! Aguarda que o administrador te coloque na whitelist.",

        genericError:
            "Ocorreu um erro. Tenta novamente.",

        passwordMismatch:
            "As passwords não coincidem.",

        signupSuccess:
            "Conta criada! Verifica o teu email para confirmar a conta. O email pode demorar a chegar.",

        invalidLogin:
            "Email ou password incorretos.",

        emailNotConfirmed:
            "Confirma primeiro o teu email.",

        couldNotLogin:
            "Não foi possível entrar.",

        copied:
            "Copiado!",

        copyError:
            "Não foi possível copiar.",

        deleteError:
            "Não foi possível apagar o pedido.",

        updateError:
            "Não foi possível alterar o estado."
    },


    en: {

        homeTitle: "MINECRAFT WHITELIST",
        homeSubtitle: "Join our server whitelist",

        minecraftName: "Minecraft Username",
        notRobot: "I'm not a robot",
        submit: "Submit",

        loginAccount: "Log in",
        createAccount: "Create account",
        adminLogin: "Log in as administrator",

        loginTitle: "LOG IN",
        loginSubtitle: "Log in to your account",

        email: "Email",
        password: "Password",
        login: "Log in",
        back: "← Back",

        signupTitle: "CREATE ACCOUNT",
        signupSubtitle: "Create an account for the server",
        username: "Username",
        confirmPassword: "Confirm password",
        alreadyAccount: "I already have an account",

        hello: "HELLO!",
        logout: "Log out",

        server: "Server",
        requestWhitelist: "Request Whitelist",
        serverInformation: "Server Information",

        copy: "Copy",
        port: "Port: 20557",
        difficulty: "Difficulty",
        version: "Version",

        requestSubtitle:
            "Send your Minecraft username to join the whitelist.",

        administrator: "ADMINISTRATOR",
        adminSubtitle: "Log in to the administration panel",
        adminPanel: "Administration panel",

        whitelistRequests: "Whitelist Requests",
        loadingRequests: "Loading requests...",

        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",

        pendingText:
            "Your request is waiting for approval.",

        approvedText:
            "You can now join the server!",

        rejectedText:
            "Your request was rejected.",

        approve: "Approve",
        reject: "Reject",
        delete: "Delete",

        noRequests:
            "No requests yet.",

        adminLoadError:
            "Could not load the requests.",

        captchaError:
            "Confirm that you are not a robot.",

        emptyUsername:
            "Enter your Minecraft username.",

        oneTime:
            "You can only submit your username once. Contact the administrator if you need help.",

        duplicate:
            "Username already registered.",

        success:
            "Done! Wait for the administrator to add you to the whitelist.",

        genericError:
            "An error occurred. Try again.",

        passwordMismatch:
            "The passwords do not match.",

        signupSuccess:
            "Account created! Check your email to confirm your account. The email may take a while to arrive.",

        invalidLogin:
            "Incorrect email or password.",

        emailNotConfirmed:
            "Please confirm your email first.",

        couldNotLogin:
            "Could not log in.",

        copied:
            "Copied!",

        copyError:
            "Could not copy.",

        deleteError:
            "Could not delete the request.",

        updateError:
            "Could not update the status."
    }

};


function detectarIdioma() {

    const saved =
        localStorage.getItem("site_language");

    if (
        saved === "pt" ||
        saved === "en"
    ) {
        return saved;
    }

    const languages =
        navigator.languages || [
            navigator.language || "en"
        ];

    const isPortuguese =
        languages.some(language =>
            language
                .toLowerCase()
                .startsWith("pt")
        );

    return isPortuguese ? "pt" : "en";
}


let currentLanguage = detectarIdioma();


function t(key) {

    return (
        translations[currentLanguage][key] ||
        key
    );

}


function aplicarIdioma() {

    document.documentElement.lang =
        currentLanguage === "pt"
            ? "pt-PT"
            : "en";


    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            if (
                translations[currentLanguage][key]
            ) {

                element.textContent =
                    translations[currentLanguage][key];

            }

        });


    const languageSelect =
        document.getElementById(
            "languageSelect"
        );


    if (languageSelect) {

        languageSelect.value =
            currentLanguage;

    }


    if (
        typeof whitelistStatus !==
        "undefined" &&
        whitelistStatus
    ) {

        atualizarStatusWhitelist();

    }

}


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


async function mostrarConta() {

    esconderTodos();

    accountPanel.classList.remove("hidden");

    await carregarEstadoWhitelist();

}


function mostrarAdmin() {

    esconderTodos();

    adminPanel.classList.remove("hidden");

}


/* =========================
   APLICAR IDIOMA
========================= */

aplicarIdioma();


/* =========================
   BOTÕES DE NAVEGAÇÃO
========================= */

document
    .getElementById("showLoginButton")
    .addEventListener(
        "click",
        mostrarLogin
    );


document
    .getElementById("showSignupButton")
    .addEventListener(
        "click",
        mostrarSignup
    );


document
    .getElementById("showAdminButton")
    .addEventListener(
        "click",
        mostrarAdminLogin
    );


document
    .getElementById("backFromLogin")
    .addEventListener(
        "click",
        mostrarHome
    );


document
    .getElementById("backFromSignup")
    .addEventListener(
        "click",
        mostrarHome
    );


document
    .getElementById("backFromAdmin")
    .addEventListener(
        "click",
        mostrarHome
    );


document
    .getElementById("goToSignup")
    .addEventListener(
        "click",
        mostrarSignup
    );


document
    .getElementById("goToLogin")
    .addEventListener(
        "click",
        mostrarLogin
    );


/* =========================
   SELETOR DE IDIOMA
========================= */

document
    .getElementById("languageSelect")
    .addEventListener(
        "change",
        function() {

            currentLanguage =
                this.value;

            localStorage.setItem(
                "site_language",
                currentLanguage
            );

            aplicarIdioma();

            if (
                !adminPanel.classList.contains(
                    "hidden"
                )
            ) {

                carregarPedidosAdmin();

            }

        }
    );


/* =========================
   WHITELIST PÚBLICA
========================= */

whitelistForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        message.textContent = "";
        message.className = "";


        const username =
            document
                .getElementById(
                    "minecraftUsername"
                )
                .value
                .trim();


        const captcha =
            document
                .getElementById(
                    "captchaCheck"
                )
                .checked;


        if (!captcha) {

            message.textContent =
                t("captchaError");

            message.className =
                "error";

            return;

        }


        if (!username) {

            message.textContent =
                t("emptyUsername");

            message.className =
                "error";

            return;

        }


        if (
            localStorage.getItem(
                "whitelist_submitted"
            ) === "true"
        ) {

            message.textContent =
                t("oneTime");

            message.className =
                "error";

            return;

        }


        try {

            const response =
                await fetch(
                    `${SUPABASE_URL}/rest/v1/whitelist_requests`,
                    {
                        method: "POST",

                        headers: {
                            "apikey":
                                SUPABASE_KEY,

                            "Authorization":
                                `Bearer ${SUPABASE_KEY}`,

                            "Content-Type":
                                "application/json",

                            "Prefer":
                                "return=minimal"
                        },

                        body:
                            JSON.stringify({
                                username:
                                    username,

                                status:
                                    "pending"
                            })
                    }
                );


            if (!response.ok) {

                let errorData = {};

                try {

                    errorData =
                        await response.json();

                } catch (_) {}


                if (
                    errorData.code ===
                    "23505"
                ) {

                    message.textContent =
                        t("duplicate");

                    message.className =
                        "error";

                    return;

                }


                throw new Error(
                    errorData.message ||
                    t("genericError")
                );

            }


            localStorage.setItem(
                "whitelist_submitted",
                "true"
            );


            message.textContent =
                t("success");

            message.className =
                "success";


            document
                .getElementById(
                    "minecraftUsername"
                )
                .value = "";


            document
                .getElementById(
                    "captchaCheck"
                )
                .checked = false;


        } catch (error) {

            console.error(error);

            message.textContent =
                t("genericError");

            message.className =
                "error";

        }

    }
);


/* =========================
   CRIAR CONTA
========================= */

signupForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        signupMessage.textContent = "";
        signupMessage.className = "";


        const username =
            document
                .getElementById(
                    "signupUsername"
                )
                .value
                .trim();


        const email =
            document
                .getElementById(
                    "signupEmail"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "signupPassword"
                )
                .value;


        const passwordConfirm =
            document
                .getElementById(
                    "signupPasswordConfirm"
                )
                .value;


        if (
            password !==
            passwordConfirm
        ) {

            signupMessage.textContent =
                t("passwordMismatch");

            signupMessage.className =
                "error";

            return;

        }


        try {

            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signUp({

                        email:
                            email,

                        password:
                            password,

                        options: {

                            data: {
                                username:
                                    username
                            }

                        }

                    });


            if (error) {
                throw error;
            }


            if (
                data.user &&
                data.session
            ) {

                await prepararPerfil(
                    data.user
                );

            }


            signupMessage.textContent =
                t("signupSuccess");

            signupMessage.className =
                "success";


            signupForm.reset();


        } catch (error) {

            console.error(error);

            signupMessage.textContent =
                error.message ||
                t("genericError");

            signupMessage.className =
                "error";

        }

    }
);


/* =========================
   LOGIN
========================= */

loginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        loginMessage.textContent = "";
        loginMessage.className = "";


        const email =
            document
                .getElementById(
                    "loginEmail"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "loginPassword"
                )
                .value;


        try {

            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email:
                            email,

                        password:
                            password

                    });


            if (error) {
                throw error;
            }


            if (!data.user) {

                throw new Error(
                    t("couldNotLogin")
                );

            }


            currentUser =
                data.user;


            await prepararPerfil(
                data.user
            );


            loginForm.reset();


            await atualizarConta(
                data.user
            );


        } catch (error) {

            console.error(error);


            let errorText =
                error.message ||
                t("invalidLogin");


            if (
                error.message ===
                "Invalid login credentials"
            ) {

                errorText =
                    t("invalidLogin");

            }


            if (
                error.message ===
                "Email not confirmed"
            ) {

                errorText =
                    t("emailNotConfirmed");

            }


            loginMessage.textContent =
                errorText;

            loginMessage.className =
                "error";

        }

    }
);


/* =========================
   PERFIL
========================= */

async function prepararPerfil(user) {

    const username =
        user.user_metadata?.username ||
        "Utilizador";


    const {
        error
    } =
        await supabaseClient
            .from("profiles")
            .insert({

                id:
                    user.id,

                username:
                    username

            });


    if (
        error &&
        error.code !== "23505"
    ) {

        console.error(
            "Erro ao criar perfil:",
            error
        );

    }

}


async function atualizarConta(user) {

    currentUser =
        user;


    let username =
        user.user_metadata?.username;


    const {
        data,
        error
    } =
        await supabaseClient
            .from("profiles")
            .select("username")
            .eq("id", user.id)
            .maybeSingle();


    if (
        !error &&
        data?.username
    ) {

        username =
            data.username;

    }


    accountUsername.textContent =
        username ||
        "Utilizador";


    await mostrarConta();

}


/* =========================
   ESTADO DA WHITELIST
========================= */

async function carregarEstadoWhitelist() {

    if (!currentUser) {
        return;
    }


    const {
        data: requests,
        error
    } =
        await supabaseClient
            .from("whitelist_requests")
            .select(
                "username,status,created_at"
            )
            .eq(
                "user_id",
                currentUser.id
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            )
            .limit(1);


    if (error) {

        console.error(
            "Erro ao carregar whitelist:",
            error
        );

        whitelistStatus.classList.add(
            "hidden"
        );

        return;

    }


    if (
        !requests ||
        requests.length === 0
    ) {

        whitelistStatus.classList.add(
            "hidden"
        );

        return;

    }


    const request =
        requests[0];


    document
        .getElementById(
            "accountMinecraftUsername"
        )
        .value =
        request.username || "";


    whitelistStatus.dataset.status =
        request.status;


    whitelistStatus.classList.remove(
        "hidden"
    );


    atualizarStatusWhitelist();

}


function atualizarStatusWhitelist() {

    if (!whitelistStatus) {
        return;
    }


    const status =
        whitelistStatus.dataset.status;


    if (!status) {
        return;
    }


    if (status === "pending") {

        whitelistStatusIcon.textContent =
            "🟡";

        whitelistStatusTitle.textContent =
            t("pending");

        whitelistStatusText.textContent =
            t("pendingText");

        whitelistStatus.className =
            "whitelist-status status-pending";

    }


    if (status === "approved") {

        whitelistStatusIcon.textContent =
            "🟢";

        whitelistStatusTitle.textContent =
            t("approved");

        whitelistStatusText.textContent =
            t("approvedText");

        whitelistStatus.className =
            "whitelist-status status-approved";

    }


    if (status === "rejected") {

        whitelistStatusIcon.textContent =
            "🔴";

        whitelistStatusTitle.textContent =
            t("rejected");

        whitelistStatusText.textContent =
            t("rejectedText");

        whitelistStatus.className =
            "whitelist-status status-rejected";

    }

}


/* =========================
   LOGOUT
========================= */

document
    .getElementById(
        "logoutButton"
    )
    .addEventListener(
        "click",
        async function() {

            await supabaseClient.auth.signOut();

            currentUser = null;

            mostrarHome();

        }
    );


/* =========================
   TABS
========================= */

serverTab.addEventListener(
    "click",
    function() {

        serverTab.classList.add(
            "active"
        );

        requestTab.classList.remove(
            "active"
        );

        serverSection.classList.remove(
            "hidden"
        );

        requestSection.classList.add(
            "hidden"
        );

    }
);


requestTab.addEventListener(
    "click",
    async function() {

        requestTab.classList.add(
            "active"
        );

        serverTab.classList.remove(
            "active"
        );

        requestSection.classList.remove(
            "hidden"
        );

        serverSection.classList.add(
            "hidden"
        );

        await carregarEstadoWhitelist();

    }
);


/* =========================
   PEDIR WHITELIST PELA CONTA
========================= */

accountWhitelistForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        accountWhitelistMessage.textContent =
            "";

        accountWhitelistMessage.className =
            "";


        const username =
            document
                .getElementById(
                    "accountMinecraftUsername"
                )
                .value
                .trim();


        if (!username) {

            accountWhitelistMessage.textContent =
                t("emptyUsername");

            accountWhitelistMessage.className =
                "error";

            return;

        }


        if (!currentUser) {

            accountWhitelistMessage.textContent =
                t("couldNotLogin");

            accountWhitelistMessage.className =
                "error";

            return;

        }


        try {

            const response =
                await fetch(
                    `${SUPABASE_URL}/rest/v1/whitelist_requests`,
                    {

                        method:
                            "POST",

                        headers: {

                            "apikey":
                                SUPABASE_KEY,

                            "Authorization":
                                `Bearer ${SUPABASE_KEY}`,

                            "Content-Type":
                                "application/json",

                            "Prefer":
                                "return=minimal"

                        },

                        body:
                            JSON.stringify({

                                username:
                                    username,

                                user_id:
                                    currentUser.id,

                                status:
                                    "pending"

                            })

                    }
                );


            if (!response.ok) {

                let errorData = {};

                try {

                    errorData =
                        await response.json();

                } catch (_) {}


                if (
                    errorData.code ===
                    "23505"
                ) {

                    accountWhitelistMessage.textContent =
                        t("duplicate");

                    accountWhitelistMessage.className =
                        "error";

                    return;

                }


                throw new Error(
                    errorData.message ||
                    t("genericError")
                );

            }


            accountWhitelistMessage.textContent =
                t("success");

            accountWhitelistMessage.className =
                "success";


            whitelistStatus.dataset.status =
                "pending";


            whitelistStatus.classList.remove(
                "hidden"
            );


            atualizarStatusWhitelist();


        } catch (error) {

            console.error(error);

            accountWhitelistMessage.textContent =
                t("genericError");

            accountWhitelistMessage.className =
                "error";

        }

    }
);


/* =========================
   LOGIN ADMIN
========================= */

adminLoginForm.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();

        adminLoginMessage.textContent =
            "";

        adminLoginMessage.className =
            "";


        const email =
            document
                .getElementById(
                    "adminEmail"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "adminPassword"
                )
                .value;


        try {

            const {
                data,
                error
            } =
                await supabaseClient.auth
                    .signInWithPassword({

                        email:
                            email,

                        password:
                            password

                    });


            if (error) {
                throw error;
            }


            if (!data.user) {

                throw new Error(
                    t("couldNotLogin")
                );

            }


            if (
                data.user.id !==
                "84dfd850-c596-4d23-8aad-110ad773f1cc"
            ) {

                await supabaseClient.auth.signOut();

                throw new Error(
                    t("invalidLogin")
                );

            }


            adminLoginForm.reset();


            await carregarPedidosAdmin();


            mostrarAdmin();


        } catch (error) {

            console.error(error);

            adminLoginMessage.textContent =
                error.message ||
                t("invalidLogin");

            adminLoginMessage.className =
                "error";

        }

    }
);


/* =========================
   CARREGAR PEDIDOS ADMIN
========================= */

async function carregarPedidosAdmin() {

    if (!adminRequests) {
        return;
    }


    adminRequests.innerHTML =
        `<p>${t("loadingRequests")}</p>`;


    const {
        data: requests,
        error
    } =
        await supabaseClient
            .from("whitelist_requests")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(error);

        adminRequests.innerHTML =
            `<p class="error">${t("adminLoadError")}</p>`;

        return;

    }


    if (
        !requests ||
        requests.length === 0
    ) {

        adminRequests.innerHTML =
            `<p class="empty-requests">${t("noRequests")}</p>`;

        return;

    }


    adminRequests.innerHTML =
        "";


    requests.forEach(request => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "request-card";


        const top =
            document.createElement(
                "div"
            );

        top.className =
            "request-card-top";


        const username =
            document.createElement(
                "div"
            );

        username.className =
            "request-username";

        username.textContent =
            request.username;


        top.appendChild(
            username
        );


        const status =
            document.createElement(
                "div"
            );

        status.className =
            "request-status";


        if (
            request.status ===
            "approved"
        ) {

            status.textContent =
                "🟢 " +
                t("approved");

            status.classList.add(
                "status-approved"
            );

        } else if (
            request.status ===
            "rejected"
        ) {

            status.textContent =
                "🔴 " +
                t("rejected");

            status.classList.add(
                "status-rejected"
            );

        } else {

            status.textContent =
                "🟡 " +
                t("pending");

            status.classList.add(
                "status-pending"
            );

        }


        const date =
            document.createElement(
                "div"
            );

        date.className =
            "request-date";


        if (request.created_at) {

            const data =
                new Date(
                    request.created_at
                );


            date.textContent =
                data.toLocaleString(
                    currentLanguage === "pt"
                        ? "pt-PT"
                        : "en-US"
                );

        }


        const actions =
            document.createElement(
                "div"
            );

        actions.className =
            "request-actions";


        const approveButton =
            document.createElement(
                "button"
            );

        approveButton.className =
            "approve-button";

        approveButton.textContent =
            t("approve");


        approveButton.addEventListener(
            "click",
            async function() {

                await alterarEstadoPedido(
                    request.id,
                    "approved"
                );

            }
        );


        const rejectButton =
            document.createElement(
                "button"
            );

        rejectButton.className =
            "reject-button";

        rejectButton.textContent =
            t("reject");


        rejectButton.addEventListener(
            "click",
            async function() {

                await alterarEstadoPedido(
                    request.id,
                    "rejected"
                );

            }
        );


        const deleteButton =
            document.createElement(
                "button"
            );

        deleteButton.className =
            "delete-button";

        deleteButton.textContent =
            t("delete");


        deleteButton.addEventListener(
            "click",
            async function() {

                await apagarPedido(
                    request.id
                );

            }
        );


        actions.appendChild(
            approveButton
        );

        actions.appendChild(
            rejectButton
        );

        actions.appendChild(
            deleteButton
        );


        card.appendChild(
            top
        );

        card.appendChild(
            status
        );

        card.appendChild(
            date
        );

        card.appendChild(
            actions
        );


        adminRequests.appendChild(
            card
        );

    });

}


/* =========================
   ALTERAR ESTADO
========================= */

async function alterarEstadoPedido(
    id,
    status
) {

    const {
        error
    } =
        await supabaseClient
            .from(
                "whitelist_requests"
            )
            .update({
                status:
                    status
            })
            .eq(
                "id",
                id
            );


    if (error) {

        console.error(error);

        alert(
            t("updateError")
        );

        return;

    }


    await carregarPedidosAdmin();

}


/* =========================
   APAGAR PEDIDO
========================= */

async function apagarPedido(id) {

    const {
        error
    } =
        await supabaseClient
            .from(
                "whitelist_requests"
            )
            .delete()
            .eq(
                "id",
                id
            );


    if (error) {

        console.error(error);

        alert(
            t("deleteError")
        );

        return;

    }


    await carregarPedidosAdmin();

}


/* =========================
   LOGOUT ADMIN
========================= */

document
    .getElementById(
        "adminLogoutButton"
    )
    .addEventListener(
        "click",
        async function() {

            await supabaseClient.auth.signOut();

            currentUser = null;

            mostrarHome();

        }
    );


/* =========================
   BOTÕES COPIAR
========================= */

document
    .querySelectorAll(
        ".copy-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            async function() {

                const text =
                    button.dataset.copy;


                try {

                    await navigator
                        .clipboard
                        .writeText(text);


                    const originalText =
                        button.textContent;


                    button.textContent =
                        t("copied");


                    setTimeout(() => {

                        button.textContent =
                            originalText;

                    }, 1200);


                } catch (error) {

                    console.error(error);

                    alert(
                        t("copyError")
                    );

                }

            }
        );

    });


/* =========================
   VERIFICAR SESSÃO
========================= */

async function verificarSessao() {

    const {
        data: {
            session
        }
    } =
        await supabaseClient.auth
            .getSession();


    if (!session) {

        mostrarHome();

        return;

    }


    const {
        data: {
            user
        }
    } =
        await supabaseClient.auth
            .getUser();


    if (!user) {

        mostrarHome();

        return;

    }


    currentUser =
        user;


    if (
        user.id ===
        "84dfd850-c596-4d23-8aad-110ad773f1cc"
    ) {

        await carregarPedidosAdmin();

        mostrarAdmin();

        return;

    }


    await atualizarConta(
        user
    );

}


verificarSessao();