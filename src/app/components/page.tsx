import style from "../components/page.module.scss"
import toListIcon from "../../icons/toListIcon.svg"
import logar from "../../icons/logar.svg"
import Image from 'next/image';
import Link from 'next/link'; 
export default function TelaInicial() {
    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.toList}>
                        <button className={style.buttonList}>
                            <Image className={style.iconList} src={toListIcon} alt="list" />
                            <div className={style.titulo}>Minhas Tarefas</div>
                        </button>
                    </div>

                    <Link href="/login" className={style.link}>
                    <div className={style.toList}>
                        <button className={style.buttonLogar}>
                            <Image className={style.iconList} src={logar} alt="logar" />
                            <div className={style.titulo}>Logar</div>
                        </button>
                    </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}