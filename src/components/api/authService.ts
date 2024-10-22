// Função para decodificar o token JWT
export function decodeJWT(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
}

// Função para buscar todos os usuários
export async function fetchUsers(): Promise<any[]> {
    const response = await fetch('https://fakestoreapi.com/users');
    if (!response.ok) {
        throw new Error('Erro ao buscar usuários');
    }
    return await response.json();
}

// Função para autenticar o usuário utilizando a Fake Store API
export async function authenticateUser(username: string, password: string): Promise<any> {
    const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (!response.ok) {
        throw new Error('Falha na autenticação');
    }

    return await response.json();  // Retorna o token JWT
}