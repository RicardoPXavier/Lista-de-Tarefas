// pages/index.tsx
import Head from 'next/head';
import RegistroOperacao from '../components/registro_operacao';

const Home: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Registro de Operação</title>
                <meta name="description" content="Registro de operação" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <RegistroOperacao />
            </main>
        </div>
    );
};

export default Home;
