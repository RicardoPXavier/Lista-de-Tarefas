"use client"
import style from "../dashboard/page.module.scss"
import toListIcon from "../../icons/toListIcon.svg"
import logar from "../../icons/logar.svg"
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { subscribe } from "diagnostics_channel";
import { auth, firestore } from "../../config/firebase";
import logout from "../../icons/logout.svg"

export default function TelaInicial() {

    const [userLoggedIn, setUserLoggedIn] = useState(false);
    useEffect(() => {
        const unsubcrible = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLoggedIn(true);
            } else {
                setUserLoggedIn(false);
            }

            return () => unsubcrible
        });

    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.header}>
                        <button className={style.buttonLogout} onClick={handleLogout}>
                            <Image
                                className={style.iconExcluir}
                                src={logout}
                                alt="Logout Icon"
                                width={20}
                                height={20}
                            />
                            <span>Logout</span>
                        </button>
                    </div>

                    <div className={style.toList}>
                        <Link href="/listagem" className={style.link}>
                            <button className={style.buttonList} disabled={!userLoggedIn}>
                                <Image className={style.iconList} src={toListIcon} alt="list" />
                                <div className={style.titulo}> {!userLoggedIn ? "Indisponível" : "Minhas Tarefas"} </div>
                            </button>
                        </Link>
                    </div>

                    <div className={style.toList}>
                        <Link href="/login" className={style.link}>
                            <button className={style.buttonLogar} disabled={userLoggedIn}>
                                <Image className={style.iconList} src={logar} alt="logar" />
                                <div className={style.titulo}>{userLoggedIn ? "Já está Logado" : "Logar"}</div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}