"use client"
import style from "../components/page.module.scss"
import toListIcon from "../../icons/toListIcon.svg"
import logar from "../../icons/logar.svg"
import Image from 'next/image';
import Link from 'next/link'; 
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { subscribe } from "diagnostics_channel";
import { auth, firestore } from "../../config/firebase";

export default function TelaInicial() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    useEffect(() => {
        const unsubcrible = onAuthStateChanged(auth, (user) =>{
            if(user){
                setUserLoggedIn(true);
            } else{
                setUserLoggedIn(false);
            }
       
            return () => unsubcrible
        });
        
    }, []);
    return (
        <main>
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.toList}>
                    <Link href="/listagem" className={style.link}>
                        <button className={style.buttonList}>
                            <Image className={style.iconList} src={toListIcon} alt="list" />
                            <div className={style.titulo}>Minhas Tarefas</div>
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