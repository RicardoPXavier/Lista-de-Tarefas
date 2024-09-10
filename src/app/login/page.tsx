"use client"
import React, { useState } from 'react';
import googleIcon from '../../icons/google.svg';
import Image from 'next/image';
import style from '@/app/login/page.module.scss';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Link from 'next/link';
import { firestore } from "../../config/firebase";


interface FirebaseError extends Error {
    code: string;
}

export default function TelaLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [resetPassword, setResetPassword] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            const userId = user.uid;
            console.log('Usuário encontrado', userId);
            setMessage('Login bem-sucedido!');
            setIsLoggedIn(true);
            window.location.href = '/';
        } catch (err: any) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setErrorMessage('Nenhum usuário ou senha cadastrada');
            } else {
                setErrorMessage('Erro ao tentar logar, verifique o login ou a senha');
            }
            setMessage('');
        }
    };

    const handleResetSenha = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setErrorMessage('');
        } catch (error) {
            const firebaseError = error as FirebaseError;
            switch (firebaseError.code) {
                case 'auth/invalid-email':
                    setErrorMessage('O e-mail fornecido é inválido.');
                    break;
                case 'auth/user-not-found':
                    setErrorMessage('Nenhum usuário encontrado com esse e-mail.');
                    break;
                default:
                    setErrorMessage('Erro ao tentar enviar o e-mail de redefinição.');
            }
            setMessage('');
        }
    };

    return (
        <main>
            <div className={style.wrapper}>
                <div id={style.container}>
                    <div className={style.titulo}>Bem Vindo(a)!</div>
                    <form onSubmit={resetPassword ? handleResetSenha : handleLogin}>
                        <div className={style.inputGroup}>
                            <label>Email:</label>
                            <input
                                type="email"
                                placeholder="Digite seu email"
                                className={style.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        {!resetPassword && (
                            <div className={style.inputGroup}>
                                <label>Senha:</label>
                                <input
                                    type="password"
                                    placeholder="Digite sua senha"
                                    className={style.input}
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                        )}
                        <div className={style.options}>
                            {!resetPassword && (
                                <div className={style.rememberMe}>
                                    <input type="checkbox" id="remember" className={style.checkbox} />
                                    <label htmlFor="remember">Lembrar senha</label>
                                </div>
                            )}
                            <div className={style.forgotPassword} onClick={() => setResetPassword(!resetPassword)}>
                                {resetPassword ? 'Voltar Login' : 'Esqueceu sua senha?'}
                            </div>
                        </div>
                        {message && <div className={style.successMessage}>{message}</div>}
                        {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}
                        <div className={style.containerButton}>
                            <button className={style.buttonAcessar} type="submit">
                                {resetPassword ? 'Enviar link de redefinição' : 'Acessar'}
                            </button>
                        </div>
                        <div className={style.signupPrompt}>
                            <div>
                                Ainda não possui uma conta?{' '}
                                <Link href="/cadastro" className={style.signupLink}>Cadastre-se</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
