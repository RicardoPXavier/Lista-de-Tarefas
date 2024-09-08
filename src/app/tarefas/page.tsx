"use client"
import Head from 'next/head';
import styles from "../tarefas/page.module.scss"; // Importa o arquivo SCSS como um módulo
import React from 'react'
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, collection, addDoc } from 'firebase/firestore';
import { auth, firestore } from "../../config/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const novaTarefaSchema = z.object({
    id: z.string().optional(),
    nome: z.string(),
    descricao: z.string(),
    dataInicial: z.string(),
    dataFinal: z.string(),
    horaInicial: z.string(),
    horaFinal: z.string()
});

export type NovaTarefaSchema = z.infer<typeof novaTarefaSchema>;

export default function TelaNovaTarefa() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<NovaTarefaSchema>({
        resolver: zodResolver(novaTarefaSchema)
    });


    const addDocuments = async (data: NovaTarefaSchema) => {
        try {
            const user = auth.currentUser;

            if(user){
                const userId = user.uid;
    
                await setDoc(doc(firestore, 'novaTarefa', userId), {
                    ...data,
                    userId: userId,
                });
                console.log('Documento adicionado com ID:', userId);
                reset();
            }        
        } catch (err) {
            console.log('Documento não encontrado', err);
        }
    };

    return (
        <div>
            <main>
                <div className={styles.wrapper}>
                    <div id={styles.container}>
                        <div className={styles.titulo}>Nova Tarefa</div>
                        <form onSubmit={handleSubmit(addDocuments)}>
                            <label className={styles.input_campo}>Nome da tarefa</label>
                            <input className={styles.input_nome} type="text" placeholder="Nome da tarefa"
                                {...register('nome')}
                            />

                            <label className={styles.input_campo}>Descrição da tarefa</label>
                            <input className={styles.input_descricao} type="text" placeholder="Descrição da tarefa"
                                {...register('descricao')}
                            />

                            <label className={styles.input_campo}>Data de início</label>
                            <input className={styles.input_data_inicio} type="date"
                                {...register('dataInicial')}
                            />

                            <label className={styles.input_campo}>Data final</label>
                            <input className={styles.input_data_final} type="date"
                                {...register('dataFinal')}
                            />

                            <label className={styles.input_campo}>Hora inicial</label>
                            <input className={styles.input_hora_inicial} type="time"
                                {...register('horaInicial')}
                            />

                            <label className={styles.input_campo}>Hora final</label>
                            <input className={styles.input_hora_final} type="time"
                                {...register('horaFinal')}
                            />

                            <button className={styles.button_cadastrar} type='submit'>Salvar Tarefa</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}