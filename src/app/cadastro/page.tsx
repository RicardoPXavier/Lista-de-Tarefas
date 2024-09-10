"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { doc, getDoc, setDoc, collection } from 'firebase/firestore';
import { auth, firestore } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import style from '@/app/cadastro/page.module.scss';
import email from '../../icons/email.svg';
import senha from '../../icons/senha.svg';
import telefone from '../../icons/telefone.svg';
import username from '../../icons/username.svg';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import { z } from "zod";

const cadastroUsuarioSchema = z.object({
    id: z.string().optional(),
    nome: z.string(),
    email: z.string().email("Email inválido"),
    telefone: z.string(),
    senha: z.string()
});
export type CadastroUsuarioSchema = z.infer<typeof cadastroUsuarioSchema>;

export default function TelaCadastro() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<CadastroUsuarioSchema>({
        resolver: zodResolver(cadastroUsuarioSchema)
    });
    const [initialValue, setInitialValues] = useState<CadastroUsuarioSchema | null>(null);

    const addDocuments = async (data: CadastroUsuarioSchema) => {
        try {
            const telefoneSemMask = data.telefone.replace(/\D/g, '');
            const telefoneComoNumero = parseInt(telefoneSemMask, 10);

        
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.senha);
            const user = userCredential.user;
            const userId = user.uid;


            await setDoc(doc(firestore, 'cadastro', userId), {
                ...data,
                telefone: telefoneComoNumero,
                userId: userId,
            });
            reset();

            console.log('Documento adicionado com ID:', userId);
        } catch (err) {
            console.log('Documento não encontrado', err);
        }
    };

    return (
        <main>
            <div className={style.wrapper}>
                <div id={style.container}>
                    <div className={style.titulo}>Cadastrar</div>
                    <form onSubmit={handleSubmit(addDocuments)}>
                        <div className={style.nomeTitulo}>Nome:
                            <div className={style.inputNome}>
                                <Image className={style.username} src={username} alt="logo" />
                                <input
                                    type="text"
                                    placeholder="Nome do Usuário"
                                    className={style.nome}
                                    {...register('nome')}
                                />
                                {errors.nome && <span>{errors.nome.message}</span>}
                            </div>
                        </div>

                        <div className={style.emailTitulo}>Email:
                            <div className={style.inputEmail}>
                                <Image className={style.email} src={email} alt="logo" />
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className={style.email}
                                    {...register('email')}
                                />
                                {errors.email && <span>{errors.email.message}</span>}
                            </div>
                        </div>

                        <div className={style.telefoneTitulo}>Telefone:
                            <div className={style.inputTelefone}>
                                <Image className={style.telefone} src={telefone} alt="logo" />
                                <InputMask
                                    mask="(99) 99999-9999"
                                    placeholder="Telefone"
                                    className={style.telefone}
                                    {...register('telefone')}
                                />
                                {errors.telefone && <span>{errors.telefone.message}</span>}
                            </div>
                        </div>

                        <div className={style.senhaTitulo}>Senha:
                            <div className={style.inputSenha}>
                                <Image className={style.senha} src={senha} alt="logo" />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    className={style.senha}
                                    {...register('senha')}
                                />
                                {errors.senha && <span>{errors.senha.message}</span>}
                            </div>
                        </div>

                        <div className={style.containerButton}>
                            <button type="submit" className={style.buttonCadastrar}>Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
