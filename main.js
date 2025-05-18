// Gestion des paramètres
let userId = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialiser Firebase
    try {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                userId = user.uid;
                loadUserProfile();
                loadUserPreferences();
                console.log('Utilisateur connecté:', userId);
            } else {
                console.log('Utilisateur non connecté');
            }
        });
    } catch (error) {
        console.error('Erreur initialisation Firebase:', error);
    }

    // Bouton Retour
    const backButton = document.getElementById('backButton');
    if (backButton) {
        backButton.addEventListener('click', () => {
            const lastPage = localStorage.getItem('lastPage') || 'index.html';
            console.log('Retour vers:', lastPage);
            window.location.href = lastPage;
        });
    }

    // Gestion des champs
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userPhone = document.getElementById('userPhone');
    const resetPassword = document.getElementById('resetPassword');
    const languageSelect = document.getElementById('languageSelect');
    const textSize = document.getElementById('textSize');
    const themeSelect = document.getElementById('themeSelect');
    const voiceSelect = document.getElementById('voiceSelect');
    const profilePictureInput = document.getElementById('profilePictureInput');
    const changePhotoBtn = document.getElementById('changePhotoBtn');

    userName.addEventListener('change', () => saveProfile('name', userName.value));
    userEmail.addEventListener('change', () => saveProfile('email', userEmail.value));
    userPhone.addEventListener('change', () => saveProfile('phone', userPhone.value));
    resetPassword.addEventListener('click', (e) => {
        e.preventDefault();
        firebase.auth().sendPasswordResetEmail(userEmail.value)
            .then(() => alert('Email de réinitialisation envoyé'))
            .catch(error => console.error('Erreur réinitialisation:', error));
    });

    languageSelect.addEventListener('change', () => savePreference('language', languageSelect.value));
    textSize.addEventListener('input', () => {
        document.documentElement.style.fontSize = `${textSize.value}px`;
        savePreference('fontSize', textSize.value);
    });
    themeSelect.addEventListener('change', () => {
        const theme = themeSelect.value;
        document.body.classList.toggle('dark-mode', theme === 'dark');
        document.body.classList.toggle('light-mode', theme === 'light');
        savePreference('theme', theme);
    });
    voiceSelect.addEventListener('change', () => savePreference('voice', voiceSelect.value));

    if (changePhotoBtn && profilePictureInput) {
        changePhotoBtn.addEventListener('click', () => {
            profilePictureInput.click();
            console.log('Clic sur Changer la photo');
        });
        profilePictureInput.addEventListener('change', () => {
            const file = profilePictureInput.files[0];
            if (file) {
                uploadProfilePicture(file);
            }
        });
    }
});

// Charger le profil utilisateur
async function loadUserProfile() {
    if (!userId) return;
    try {
        const doc = await firebase.firestore().collection('users').doc(userId).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('userName').value = data.name || 'Nom Utilisateur';
            document.getElementById('userEmail').value = data.email || 'utilisateur@example.com';
            document.getElementById('userPhone').value = data.phone || '+1 (123) 456-7890';
            if (data.profilePicture) {
                document.getElementById('profilePicture').src = data.profilePicture;
            }
            console.log('Profil chargé:', data);
        }
    } catch (error) {
        console.error('Erreur chargement profil:', error);
    }
}

// Charger les préférences
async function loadUserPreferences() {
    if (!userId) return;
    try {
        const doc = await firebase.firestore().collection('users').doc(userId).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('languageSelect').value = data.language || 'fr';
            document.getElementById('textSize').value = data.fontSize || 16;
            document.getElementById('themeSelect').value = data.theme || 'light';
            document.getElementById('voiceSelect').value = data.voice || 'female';
            document.documentElement.style.fontSize = `${data.fontSize || 16}px`;
            document.body.classList.toggle('dark-mode', data.theme === 'dark');
            document.body.classList.toggle('light-mode', data.theme === 'light');
            console.log('Préférences chargées:', data);
        }
    } catch (error) {
        console.error('Erreur chargement préférences:', error);
    }
}

// Sauvegarder le profil
async function saveProfile(field, value) {
    if (!userId) return;
    try {
        await firebase.firestore().collection('users').doc(userId).update({ [field]: value });
        console.log(`Profil mis à jour: ${field} = ${value}`);
    } catch (error) {
        console.error('Erreur sauvegarde profil:', error);
    }
}

// Sauvegarder les préférences
async function savePreference(field, value) {
    if (!userId) return;
    try {
        await firebase.firestore().collection('users').doc(userId).update({ [field]: value });
        console.log(`Préférence mise à jour: ${field} = ${value}`);
    } catch (error) {
        console.error('Erreur sauvegarde préférence:', error);
    }
}

// Télécharger la photo de profil
async function uploadProfilePicture(file) {
    if (!userId) return;
    try {
        const storageRef = firebase.storage().ref(`profile_pictures/${userId}/${file.name}`);
        await storageRef.put(file);
        const url = await storageRef.getDownloadURL();
        await firebase.firestore().collection('users').doc(userId).update({ profilePicture: url });
        document.getElementById('profilePicture').src = url;
        console.log('Photo de profil téléchargée:', url);
    } catch (error) {
        console.error('Erreur téléchargement photo:', error);
    }
}

// Protection anti-copie
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => e.preventDefault());
document.addEventListener('print', e => e.preventDefault());
