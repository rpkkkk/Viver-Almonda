const firebaseConfig = {
  apiKey: "AIzaSyBy1ESM6Sp1b2aY5kIpfNQiIRSIXhq7umY",
  authDomain: "teste2-16ac7.firebaseapp.com",
  projectId: "teste2-16ac7",
  storageBucket: "teste2-16ac7.firebasestorage.app"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore ? firebase.firestore() : null;
const storage = firebase.storage ? firebase.storage() : null;
const DEVELOPER_EMAILS = [
  "rodrigo.pereira6035@gmail.com"
];
const SUPERADMIN_EMAILS = [
  "rodrigo.pereira6035@gmail.com"
];
const ADMIN_EMAILS = [];
const AUTH_PERMISSIONS = ["membro", "admin", "superadmin", "developer"];

window.auth = auth;
window.db = db;
window.storage = storage;
window.currentUserProfile = null;

function isAdminEmail(email) {
  return ADMIN_EMAILS.includes(String(email || "").trim().toLowerCase());
}

function isSuperAdminEmail(email) {
  return SUPERADMIN_EMAILS.includes(String(email || "").trim().toLowerCase());
}

function isDeveloperEmail(email) {
  return DEVELOPER_EMAILS.includes(String(email || "").trim().toLowerCase());
}

function normalizeAuthPermission(permission) {
  const value = String(permission || "").trim().toLowerCase();
  return AUTH_PERMISSIONS.includes(value) ? value : "membro";
}

function getProfilePermission(email, savedPermission) {
  if (isDeveloperEmail(email)) {
    return "developer";
  }

  if (isSuperAdminEmail(email)) {
    return "superadmin";
  }

  if (isAdminEmail(email)) {
    return "admin";
  }

  return normalizeAuthPermission(savedPermission);
}

function buildUserProfile(user, savedProfile) {
  if (!user) {
    return null;
  }

  const email = user.email || "";
  const profile = savedProfile || {};

  return {
    uid: user.uid,
    nome: user.displayName || "",
    email,
    foto: user.photoURL || "",
    ...profile,
    permissao: getProfilePermission(email, profile.permissao)
  };
}

function isAdminUser(user, profile) {
  return Boolean(user && (isDeveloperEmail(user.email) || isSuperAdminEmail(user.email) || isAdminEmail(user.email) || ["admin", "superadmin", "developer"].includes(normalizeAuthPermission(profile?.permissao))));
}

function isSuperAdminUser(user, profile) {
  return Boolean(user && (isDeveloperEmail(user.email) || isSuperAdminEmail(user.email) || ["superadmin", "developer"].includes(normalizeAuthPermission(profile?.permissao))));
}

function isDeveloperUser(user, profile) {
  return Boolean(user && (isDeveloperEmail(user.email) || normalizeAuthPermission(profile?.permissao) === "developer"));
}

window.isAdminEmail = isAdminEmail;
window.isSuperAdminEmail = isSuperAdminEmail;
window.isDeveloperEmail = isDeveloperEmail;
window.isSuperAdminUser = isSuperAdminUser;
window.isDeveloperUser = isDeveloperUser;

function login(event) {
  if (event) {
    event.preventDefault();
  }

  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider).catch((error) => {
    console.error("Login error:", error);
    alert("Nao foi possivel iniciar sessao. Tenta novamente.");
  });
}

function logout() {
  closeUserMenus();
  return auth.signOut().catch((error) => {
    console.error("Sign out error:", error);
    alert("Nao foi possivel terminar sessao. Tenta novamente.");
  });
}

window.login = login;
window.logout = logout;

function closeUserMenus() {
  document.querySelectorAll("[data-user-dropdown]").forEach((dropdown) => {
    dropdown.hidden = true;
  });

  document.querySelectorAll("[data-user-menu-button]").forEach((button) => {
    button.setAttribute("aria-expanded", "false");
  });
}

function getUserInitial(user) {
  const source = user.displayName || user.email || "U";
  return source.trim().charAt(0).toUpperCase();
}

async function saveUserProfile(user) {
  if (!db || !user) {
    return null;
  }

  const userRef = db.collection("users").doc(user.uid);
  const now = firebase.firestore.FieldValue.serverTimestamp();
  const email = user.email || "";
  const defaultPermission = getProfilePermission(email, null);
  const baseData = {
    uid: user.uid,
    nome: user.displayName || "",
    email,
    foto: user.photoURL || "",
    updatedAt: now,
    lastLoginAt: now
  };

  try {
    await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(userRef);

      if (snapshot.exists) {
        const existingData = snapshot.data() || {};
        transaction.set(userRef, {
          ...baseData,
          permissao: getProfilePermission(email, existingData.permissao)
        }, { merge: true });
        return;
      }

      transaction.set(userRef, {
        ...baseData,
        permissao: defaultPermission,
        createdAt: now
      });
    });

    const savedSnapshot = await userRef.get();
    return buildUserProfile(user, savedSnapshot.exists ? savedSnapshot.data() : null);
  } catch (error) {
    console.error("User profile error:", error);
    return buildUserProfile(user, null);
  }
}

function publishUserProfile(profile) {
  window.currentUserProfile = profile;
  document.dispatchEvent(new CustomEvent("auth-profile-changed", {
    detail: { profile }
  }));
}

function ensureUserMenus() {
  document.querySelectorAll("[data-login-link]").forEach((loginLink) => {
    if (loginLink.dataset.authBound === "true") {
      return;
    }

    loginLink.dataset.authBound = "true";
    loginLink.addEventListener("click", login);

    const userMenu = document.createElement("div");
    userMenu.className = "user-menu";
    userMenu.dataset.userMenu = "";
    userMenu.hidden = true;
    userMenu.innerHTML = `
      <button class="user-avatar" type="button" data-user-menu-button aria-label="Conta" aria-expanded="false">
        <img data-user-photo alt="Foto de perfil" hidden>
        <span data-user-initial></span>
      </button>
      <div class="user-dropdown" data-user-dropdown hidden>
        <p class="user-name" data-user-name></p>
        <p class="user-email" data-user-email></p>
        <button class="signout-button" type="button" data-signout-button>Sign out</button>
      </div>
    `;

    loginLink.insertAdjacentElement("afterend", userMenu);
  });

  document.querySelectorAll("[data-user-menu-button]").forEach((button) => {
    if (button.dataset.menuBound === "true") {
      return;
    }

    button.dataset.menuBound = "true";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const menu = button.closest("[data-user-menu]");
      const dropdown = menu.querySelector("[data-user-dropdown]");
      const willOpen = dropdown.hidden;

      closeUserMenus();
      dropdown.hidden = !willOpen;
      button.setAttribute("aria-expanded", String(willOpen));
    });
  });

  document.querySelectorAll("[data-signout-button]").forEach((button) => {
    if (button.dataset.signoutBound === "true") {
      return;
    }

    button.dataset.signoutBound = "true";
    button.addEventListener("click", logout);
  });
}

function updateAuthUI(user, profile) {
  const isAdmin = isAdminUser(user, profile);
  const isSuperAdmin = isSuperAdminUser(user, profile);
  const isDeveloper = isDeveloperUser(user, profile);

  document.body.classList.add("auth-ready");
  document.body.classList.toggle("is-logged-in", Boolean(user));
  document.body.classList.toggle("is-logged-out", !user);
  document.body.classList.toggle("is-admin", isAdmin);
  document.body.classList.toggle("is-superadmin", isSuperAdmin);
  document.body.classList.toggle("is-developer", isDeveloper);

  document.querySelectorAll("[data-login-link]").forEach((link) => {
    link.hidden = Boolean(user);
  });

  document.querySelectorAll("[data-admin-link]").forEach((link) => {
    link.hidden = !isAdmin;
  });

  document.querySelectorAll("[data-user-menu]").forEach((menu) => {
    menu.hidden = !user;
  });

  document.querySelectorAll("[data-protected-content]").forEach((element) => {
    element.hidden = !user;
  });

  document.querySelectorAll("[data-auth-gate]").forEach((element) => {
    element.hidden = Boolean(user);
  });

  if (!user) {
    publishUserProfile(null);
    closeUserMenus();
    return;
  }

  const name = user.displayName || "Utilizador";
  const email = user.email || "";
  const initial = getUserInitial(user);

  document.querySelectorAll("[data-user-name]").forEach((element) => {
    element.textContent = name;
  });

  document.querySelectorAll("[data-user-email]").forEach((element) => {
    element.textContent = email;
  });

  document.querySelectorAll("[data-user-initial]").forEach((element) => {
    element.textContent = initial;
    element.hidden = Boolean(user.photoURL);
  });

  document.querySelectorAll("[data-user-photo]").forEach((image) => {
    if (user.photoURL) {
      image.src = user.photoURL;
      image.hidden = false;
    } else {
      image.removeAttribute("src");
      image.hidden = true;
    }
  });

  const emailInput = document.getElementById("email");
  if (emailInput && !emailInput.value && email) {
    emailInput.value = email;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ensureUserMenus();

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-user-menu]")) {
      closeUserMenus();
    }
  });
});

auth.onAuthStateChanged(async (user) => {
  const profile = user ? await saveUserProfile(user) : null;
  publishUserProfile(profile);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => updateAuthUI(user, profile), { once: true });
  } else {
    ensureUserMenus();
    updateAuthUI(user, profile);
  }
});
