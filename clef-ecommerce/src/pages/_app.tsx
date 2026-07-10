import '../styles/globals.css'
import '../styles/main.css';
import type { AppProps } from 'next/app'
import { MockCartProvider } from '../context/MockCartContext'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MockCartProvider>
            <Component {...pageProps} />
        </MockCartProvider>
    )
}
