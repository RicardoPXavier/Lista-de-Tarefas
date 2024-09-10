"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { firestore, auth } from "../../config/firebase";
import styles from "../listagem/page.module.scss";
import Image from "next/image";
import certo from "../../icons/certo1.svg";
import excluir from "../../icons/excluir1.svg";
import adicionar from "../../icons/botãoAdd.svg";
import Link from "next/link";

interface Tarefa {
  id: string;
  nome: string;
  descricao: string;
  dataInicial: string;
  dataFinal: string;
  horaInicial: string;
  horaFinal: string;
  completa: boolean;
}

export default function ListaTarefas() {
  const [todos, setTodos] = useState<Tarefa[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.log("Usuário não está autenticado");
        return;
      }

      const userId = user.uid;
      const novaTarefaCollection = collection(firestore, "novaTarefa");
      const q = query(novaTarefaCollection, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      const results: Tarefa[] = querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            id: doc.id,
            nome: data.nome as string,
            descricao: data.descricao as string,
            dataInicial: data.dataInicial as string,
            dataFinal: data.dataFinal as string,
            horaInicial: data.horaInicial as string,
            horaFinal: data.horaFinal as string,
            completa: data.completa as boolean,
          };
        }
      );

      setTodos(results);
    } catch (err) {
      console.log("Erro ao buscar tarefas", err);
    }
  };

  const handleCompletarTarefa = async (tarefaId: string, completa: boolean) => {
    try {
      const tarefaRef = doc(firestore, "novaTarefa", tarefaId);
      await updateDoc(tarefaRef, { completa: !completa });

      const updatedTodos = todos.map((tarefa) =>
        tarefa.id === tarefaId ? { ...tarefa, completa: !tarefa.completa } : tarefa
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Erro ao completar a tarefa:", error);
    }
  };

  const handleExcluirTarefa = async (tarefaId: string) => {
    try {
      const tarefaRef = doc(firestore, "novaTarefa", tarefaId);
      await deleteDoc(tarefaRef);

      const updatedTodos = todos.filter((tarefa) => tarefa.id !== tarefaId);
      setTodos(updatedTodos);
      console.log("Tarefa excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  const filteredTodos = todos.filter(
    (tarefa) =>
      tarefa.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (searchDate === "" ||
        tarefa.dataInicial.includes(searchDate) ||
        tarefa.dataFinal.includes(searchDate))
  );

  return (
    <div>
      <main>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.titulo}>Lista</div>
            <div className={styles.pesquisa}>
              <input
                type="text"
                placeholder="Pesquisar por Nome"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className={styles.separador}> | </span>
              <input
                type="text"
                placeholder="Pesquisar por Data"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
            <div className={styles.app}>
              {filteredTodos.map((tarefa) => (
                <div
                  key={tarefa.id}
                  className={`${styles.cardTarefa} ${
                    tarefa.completa ? styles.tarefaCompleta : ""
                  }`}
                >
                  <div className={styles.nome}>
                    <div>
                      <strong>Nome:</strong>
                    </div>
                    <div>{tarefa.nome}</div>
                  </div>
                  <div className={styles.descricao}>
                    <div>
                      <strong>Descrição:</strong>
                    </div>
                    <div>{tarefa.descricao}</div>
                  </div>
                  <div className={styles.dataContainer}>
                    <div className={styles.dataI}>
                      <div>
                        <strong>Data de Início:</strong>
                      </div>
                      <div>{tarefa.dataInicial}</div>
                    </div>
                    <div className={styles.dataF}>
                      <div>
                        <strong>Data Final:</strong>
                      </div>
                      <div>{tarefa.dataFinal}</div>
                    </div>
                  </div>
                  <div className={styles.horaContainer}>
                    <div className={styles.horaI}>
                      <div>
                        <strong>Hora Inicial:</strong>
                      </div>
                      <div>{tarefa.horaInicial}</div>
                    </div>
                    <div className={styles.horaF}>
                      <div>
                        <strong>Hora Final:</strong>
                      </div>
                      <div>{tarefa.horaFinal}</div>
                    </div>
                  </div>

                  <div className={styles.botton}>
                    <button
                      className={styles.bottonComple}
                      onClick={() =>
                        handleCompletarTarefa(tarefa.id, tarefa.completa)
                      }
                    >
                      <Image
                        className={styles.iconCompletar}
                        src={certo}
                        alt="icon"
                        width={20}
                        height={20}
                      />
                    </button>
                    <button
                      className={styles.bottonExcluir}
                      onClick={() => handleExcluirTarefa(tarefa.id)}
                    >
                      <Image
                        className={styles.iconExcluir}
                        src={excluir}
                        alt="icon"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.containerButton}>
              <Link href="/tarefas" className={styles.link}>
                <button className={styles.buttonAdd}>
                  <Image
                    className={styles.iconAdd}
                    src={adicionar}
                    alt="icon"
                    width={50}
                    height={50}
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
