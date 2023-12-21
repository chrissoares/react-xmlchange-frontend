import React from 'react';

function Layout({children}){
    return (
        <div>
            <header>
                <h1>Meu Aplicativo</h1>
            </header>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/xml-reader">XML Reader</a></li>
                </ul>
            </nav>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Layout;