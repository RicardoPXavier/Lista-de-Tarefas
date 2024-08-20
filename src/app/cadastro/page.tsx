"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { doc, getDoc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { firestore } from "../../config/firebase";
import style from '@/app/cadastro/page.module.scss'

export default function TelaCadastro(){
    return(
        <main>
            <div className={style.container}>
                <div className={style.titulo}>Cadastrar</div>
                <div>Nome
                    <div className={style.inputNome}>
                        <input type="text" 
                               placeholder="Username"
                               className={style.nome}
                        />
                    </div>
                </div>


                <div>Email
                    <div className={style.inputEmail}>
                        <input type="text" 
                               placeholder="Email"
                               className={style.email}
                        />
                    </div>
                </div>

                <div>Telefone
                    <div className={style.inputTelefone}>
                        <input type="text" 
                               placeholder="Telefone"
                               className={style.telefone}
                        />
                    </div>
                </div>

                <div>Senha
                    <div className={style.inputSenha}>
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