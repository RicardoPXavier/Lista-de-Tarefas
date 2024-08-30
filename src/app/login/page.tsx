import Image from 'next/image';
import style from '@/app/login/page.module.scss';
import googleIcon from '../../icons/google.svg';

export default function TelaLogin() {
    return (
        <main>
            <div id={style.container}>
                <div className={style.titulo}>Bem Vindo(a)!</div>
                <div className={style.inputGroup}>
                    <label>Email:</label>
                    <input type="email" placeholder="Digite seu email" className={style.input}/>
                </div>
                <div className={style.inputGroup}>
                    <label>Senha:</label>
                    <input type="password" placeholder="Digite sua senha" className={style.input}/>
                </div>
                <div className={style.options}>
                    <div className={style.rememberMe}>
                        <input type="checkbox" id="remember" className={style.checkbox}/>
                        <label htmlFor="remember">Lembrar senha</label>
                    </div>
                    <a href="#" className={style.forgotPassword}>Esqueceu sua senha?</a>
                </div>
                <div className={style.containerButton}>
                    <button className={style.buttonAcessar}>Acessar</button>
                </div>
                <div className={style.alternativeLogin}>
                    <p>Ou entre com:</p>
                    <button className={style.googleLogin}>
                        <Image src={googleIcon} alt="Google" className={style.googleIcon}/>
                    </button>
                </div>
                <hr className={style.separator} />
                <div className={style.signupPrompt}>
                    <p>Ainda não possui uma conta? <a href="#" className={style.signupLink}>Cadastre-se</a></p>
                </div>
            </div>
        </main>
    );
}
