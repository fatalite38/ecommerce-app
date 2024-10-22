// login.ts
import { decodeJWT, fetchUsers, authenticateUser } from '../api/authService';

// Função para autenticar o usuário ao fazer login na aplicação.
async function login(event: Event) {
    event.preventDefault();  // Previne o comportamento padrão do formulário

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        // Verificação se os campos estão preenchidos
        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Faz uma requisição para obter os usuários através do authService
        const users = await fetchUsers();

        // Busca o usuário correspondente ao email fornecido
        const user = users.find((u: any) => u.email === email);
        if (!user) {
            alert('Usuário não encontrado.');
            return;
        }

        // Autentica o usuário usando o authService
        const data = await authenticateUser(user.username, password);

        // Se o token for recebido, armazena no sessionStorage
        if (data.token) {
            sessionStorage.setItem('authToken', data.token);

            // Decodifica o token para obter o userId
            const decodedToken = decodeJWT(data.token);
            const userId = decodedToken.sub;
            sessionStorage.setItem('userId', userId);

            alert('Login realizado com sucesso!');
            window.location.href = '/src/pages/productList.html';  // Redireciona para a página de produtos
        } else {
            alert('E-mail ou senha inválidos.');
        }
    } catch (error) {
        alert('Erro ao fazer login. Verifique suas credenciais.');
        console.error('Erro no login:', error);
    }
}

// Função para mostrar/ocultar a senha
const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const toggleIcon = document.getElementById('togglePassword') as HTMLImageElement;

    // Alterna o tipo de input entre 'password' e 'text'
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.src = '../assets/icons/bx-show.svg';  // Ícone de senha visível
    } else {
        passwordInput.type = 'password';
        toggleIcon.src = '../assets/icons/bxs-low-vision.svg';  // Ícone de senha oculta
    }
};

// Adiciona o evento de clique no ícone de olho para alternar visibilidade da senha
const togglePassword = document.getElementById('togglePassword');
if (togglePassword) {
    togglePassword.addEventListener('click', togglePasswordVisibility);
}

// Adiciona o evento de submit no formulário de login
const formLogin = document.getElementById('formLogin') as HTMLFormElement;
if (formLogin) {
    formLogin.addEventListener('submit', login);
}



// // Função para mostrar/ocultar a senha
// const togglePasswordVisibility = () => {
//     const passwordInput = document.getElementById('password') as HTMLInputElement;
//     const toggleIcon = document.getElementById('togglePassword') as HTMLImageElement;

//     // Alterna o tipo de input entre 'password' e 'text'
//     if (passwordInput.type === 'password') {
//         passwordInput.type = 'text';
//         toggleIcon.src = '../assets/icons/bx-show.svg'; // Ícone de senha visível
//     } else {
//         passwordInput.type = 'password';
//         toggleIcon.src = '../assets/icons/bxs-low-vision.svg'; // Ícone de senha oculta
//     }
// };

// // Adiciona o evento de clique no ícone de olho
// const togglePassword = document.getElementById('togglePassword');
// if (togglePassword) {
//     togglePassword.addEventListener('click', togglePasswordVisibility);
// }

// // Adiciona o evento de submit no formulário de login
// const formLogin = document.getElementById('formLogin') as HTMLFormElement;
// formLogin.addEventListener('submit', login);