
import Image from 'next/image';
import style from '@/app/login/page.module.scss';
import googleIcon from '../../icons/google.svg';

export default function TelaLogin() {
    return (


"use client"
import Image from 'next/image';
import style from '@/app/login/page.module.scss';
import googleIcon from '../../icons/google.svg';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword ,sendPasswordResetEmail } from "firebase/auth";
import { auth, firestore } from "../../config/firebase";

interface FirebaseError extends Error {
    code: string;
}

export default function TelaLogin() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [resetPassword, setResetPassword] = useState(false);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const userCredencial = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredencial.user;
            const userId = user.uid
            console.log("Usuario encontrado", userId);
            setMessage('Login bem-sucedido!');
        } catch (err: any) {
            if (err.code === 'auth/use-not-found' || err.code === 'auth/wrong-password') {
                setErrorMessage('Nenhum usuário ou senha cadastrada');
            } else {
                setErrorMessage('Erro ao tentar logar, verifique a o login ou a senha')
            }
            setMessage('');
        }
    }

    const handleResetSenha = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setErrorMessage('');
        } catch (error) {
            var firebaseError = error as FirebaseError;
            if (firebaseError = error as FirebaseError) {
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
            }
            setMessage('');
        }
    }
    return (

        <main>
            <div className={style.wrapper}>
                <div id={style.container}>
                    <div className={style.titulo}>Bem Vindo(a)!</div>
                     <div className={style.inputGroup}>
                        <label>Email:</label>
                        <input type="email" placeholder="Digite seu email" className={style.input} />
                    </div>
                    <div className={style.inputGroup}>
                        <label>Senha:</label>
                        <input type="password" placeholder="Digite sua senha" className={style.input} />
                    </div>
                    <div className={style.options}>
                        <div className={style.rememberMe}>
                            <input type="checkbox" id="remember" className={style.checkbox} />
                            <label htmlFor="remember">Lembrar senha</label>
                        </div>
                        <a href="#" className={style.forgotPassword}>Esqueceu sua senha?</a>
                    </div>
                    <div className={style.containerButton}>
                        <button className={style.buttonAcessar}>Acessar</button>
                    </div>
                    <div className={style.alternativeLogin}>

                    <form onSubmit={resetPassword ? handleResetSenha : handleLogin}>
                        <div className={style.inputGroup}>
                            <label>Email:</label>
                            <input type="email"
                                placeholder="Digite seu email"
                                className={style.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                            />
                        </div>
                        {!resetPassword && (
                            <div className={style.inputGroup}>
                                <label>Senha:</label>
                                <input type="password"
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

                            <div className={style.forgotPassword}
                                 onClick={() => setResetPassword(!resetPassword)}>
                                    {resetPassword ? 'Voltar Login' : 'Esquecer sua senha?'}
                            </div>
                        </div>
                        {message && (
                            <div className={style.successMessage}>
                                {message}
                            </div>
                        )}
                        {errorMessage && (
                            <div className={style.errorMessage}>
                                {errorMessage}
                            </div>
                        )}
                        <div className={style.containerButton}>
                            <button className={style.buttonAcessar} type="submit">{resetPassword ? 'Enviar link de redefinição' : ' Acessar'}</button>
                        </div>

                        <div className={style.signupPrompt}>
                            <div>Ainda não possui uma conta?{''} <a href="/cadastro" className={style.signupLink}>Cadastre-se</a></div>
                        </div>
                    </form>

                </div>
            </div>
        </main>
    );
}
