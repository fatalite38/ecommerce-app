function decodeJWT(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
}

async function login(event: Event) {
    event.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        const usersResponse = await fetch('https://fakestoreapi.com/users');
        const users = await usersResponse.json();
        const user = users.find((u: any) => u.email === email);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const loginResponse = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.username,
                password: password,
            }),
        });

        if (!loginResponse.ok) {
            throw new Error('Falha na autenticação');
        }

        const data = await loginResponse.json();

        if (data.token) {
            sessionStorage.setItem('authToken', data.token);
            
            const decodedToken = decodeJWT(data.token);
            const userId = decodedToken.sub;
            sessionStorage.setItem('userId', userId);

            alert('Login realizado com sucesso!');
            window.location.href = '/src/pages/productList.html';
        } else {
            alert('E-mail ou senha inválido.');
        }
    } catch (error) {
        alert('Erro ao fazer login');
        console.error('Erro no login:', error);
    }
}

const formLogin = document.getElementById('formLogin') as HTMLFormElement;
formLogin.addEventListener('submit', login);