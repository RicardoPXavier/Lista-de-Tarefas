"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { firestore } from "../../config/firebase";
import style from '@/app/cadastro/page.module.scss'
import email from '../../icons/email.svg'
import senha from '../../icons/senha.svg'
import telefone from '../../icons/telefone.svg'
import username from '../../icons/username.svg'

export default function TelaCadastro(){
    return(
        <main>
            <div id={style.container}>
                <div className={style.titulo}>Cadastrar</div>
                <div className={style.nomeTitulo}>Nome:
                    <div className={style.inputNome}>
                        <Image className={style.username}
                            src={username}
                            alt="logo"
                        />
                        <input type="text" 
                               placeholder="Username"
                               className={style.nome}
                        />
                    </div>
                </div>


                <div className={style.emailTitulo}>Email:
                    <div className={style.inputEmail}>
                        <Image className={style.email}
                            src={email}
                            alt="logo"
                        />
                        <input type="text" 
                               placeholder="Email"
                               className={style.email}
                        />
                    </div>
                </div>

                <div className={style.telefoneTitulo}>Telefone:
                    <div className={style.inputTelefone}>
                        <Image className={style.telefone}
                            src={telefone}
                            alt="logo"
                        />
                        <input type="text" 
                               placeholder="Telefone"
                               className={style.telefone}
                        />
                    </div>
                </div>

                <div className={style.senhaTitulo}>Senha:
                    <div className={style.inputSenha}>
                        <Image className={style.senha}
                            src={senha}
                            alt="logo"
                        />
                        <input type="text" 
                               placeholder="Senha"
                               className={style.senha}
                        />
                    </div>
                </div>

                <div className={style.containerButton}>
                    <button className={style.buttonCadastrar}>Cadastrar</button>
                </div>
            </div>
        </main>

    );
}