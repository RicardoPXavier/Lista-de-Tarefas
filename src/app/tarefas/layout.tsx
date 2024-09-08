import React from 'react'
export default async function TelaNovaTarefa({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main>
            {children}
        </main>
    );
}
