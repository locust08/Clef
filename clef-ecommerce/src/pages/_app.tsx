import '../styles/globals.css'
import '../styles/main.css';
import type { AppProps } from 'next/app'
import { MockCartProvider } from '../context/MockCartContext'
import { CustomerProvider } from '../context/CustomerContext';
import { FavouritesProvider } from '../context/FavouritesContext';
import PreviewControls from '../components/preview/PreviewControls';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CustomerProvider>
            <FavouritesProvider>
                <MockCartProvider>
                    <Component {...pageProps} />
                    <PreviewControls active={pageProps.previewActive === true} />
                </MockCartProvider>
            </FavouritesProvider>
        </CustomerProvider>
    )
}
