import React from 'react';
import Image from 'next/image';
import type { FooterContent } from '../../lib/cms';

type FooterProps = {
  content?: FooterContent;
};

const fallbackFooterContent: FooterContent = {
  logo: {
    src: 'https://static.shuffle.dev/uploads/files/6f/6fb48a03fbf8bf9e36f18c917c673f67c9eac42d/CLEF-LOGO-FINAL-90be4a24-9d08-4222-ab18-073e39e89319-100x.avif',
    alt: 'CLEF',
    width: 100,
    height: 54,
  },
  description:
    'Sign Up to our newsletter and receive 10% off your first order!',
  socialLinks: [
    { platform: 'facebook', url: '/clef-info', label: 'Facebook' },
    { platform: 'instagram', url: '/clef-edit', label: 'Instagram' },
  ],
  quickLinks: [
    { label: 'Privacy Policy', href: '/clef-info' },
    { label: 'Terms & Conditions', href: '/clef-info' },
    { label: 'Blog', href: '/clef-edit' },
  ],
  copyrightText: 'Copyright 2026. All Rights reserved by CLEF.',
};

const safeHref = (href: string | undefined, fallback: string) =>
  href && href.trim() && href !== '#' ? href : fallback;

const Footer: React.FC<FooterProps> = ({ content = fallbackFooterContent }) => {
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setMessage('Enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/leads', {
        body: JSON.stringify({
          email: trimmedEmail,
          source: 'footer-newsletter',
          type: 'newsletter',
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      const result = await response.json() as {
        accepted?: boolean;
        error?: string;
        warnings?: string[];
      };

      if (!response.ok || !result.accepted) {
        throw new Error(result.error || 'Unable to submit your email right now.');
      }

      setEmail('');
      setMessage(
        result.warnings?.length
          ? 'Thanks. Your signup was received, but our team notification is temporarily unavailable.'
          : 'Thanks. Your signup was received by CLEF.',
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to submit your email right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <footer className="relative bg-[#E9E4D0] overflow-hidden">
    <div className="border-b border-gray-900 border-opacity-10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-5/12 px-4">
            <div className="lg:pr-12 pt-24 pb-10 border-b lg:border-b-0 lg:border-r border-gray-900 border-opacity-10">
              <h1 className="text-purple-700 text-2xl font-semibold leading-8 mb-8 max-w-md">
                {content.description}
              </h1>
              <form className="mb-9 max-w-md gap-4 sm:flex" onSubmit={handleSubscribe}>
                <input
                  className="block w-full mb-4 sm:mb-0 rounded-sm border border-coolGray-200 py-3 px-4 text-coolGray-500 outline-none"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Type your e-mail"
                  type="email"
                  value={email}
                />
                <button
                  className="inline-flex w-full sm:w-auto items-center justify-center bg-purple-500 rounded-sm py-3 px-6 text-white text-center hover:bg-purple-600 transition duration-200 clef-button-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Subscribe'}
                </button>
              </form>
              {message && <p className="mb-6 text-sm text-rhino-600">{message}</p>}
              <div className="flex flex-wrap sm:flex-nowrap gap-6">
                {content.socialLinks.map((link) => (
                  <a
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-orange-300 hover:bg-orange-400 transition duration-200 clef-link-highlight"
                    href={safeHref(link.url, '/clef-info')}
                    aria-label={link.label}
                    key={`${link.platform}-${link.url}`}
                  >
                    <span className="text-xs font-bold uppercase text-rhino-700">
                      {link.label.slice(0, 2)}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-7/12 px-4">
            <div className="pt-12 lg:pt-24 pb-12">
              <div className="flex flex-wrap lg:justify-center gap-24">
                <div className="mr-12">
                  <p className="text-gray-900 text-sm uppercase font-semibold mb-6 tracking-widest">
                    INFORMATION
                  </p>
                  <ul className="flex flex-col text-sm text-gray-700">
                    {content.quickLinks.map((link) => (
                      <li className="mb-3" key={`${link.label}-${link.href}`}>
                        <a className="inline-block text-gray-800 hover:opacity-70 transition duration-200 clef-link-highlight" href={safeHref(link.href, '/clef-info')}>
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-gray-900 text-sm uppercase font-semibold mb-6 tracking-widest">
                    CUSTOMER SERVICE
                  </p>
                  <ul className="flex flex-col text-sm text-gray-700">
                    <li className="mb-3">
                      <a className="inline-block text-gray-800 hover:opacity-70 transition duration-200 clef-link-highlight" href="/search">
                        Search Terms
                      </a>
                    </li>
                    <li className="mb-3">
                      <a className="inline-block text-gray-800 hover:opacity-70 transition duration-200 clef-link-highlight" href="/search">
                        Advanced Search
                      </a>
                    </li>
                    <li className="mb-3">
                      <a className="inline-block text-gray-800 hover:opacity-70 transition duration-200 clef-link-highlight" href="/account/history">
                        Orders and Returns
                      </a>
                    </li>
                    <li className="mb-3">
                      <a className="inline-block text-gray-800 hover:opacity-70 transition duration-200 clef-link-highlight" href="/clef-info">
                        Contact Us
                      </a>
                    </li>
                    <li className="mb-3">
                      <a className="inline-block text-gray-800 hover:opacity-70 transition duration-200 clef-link-highlight" href="/clef-info">
                        Theme FAQs
                      </a>
                    </li>
                    <li>
                      <a className="inline-block text-gray-800 hover:opacity-70 transition duration-200 clef-link-highlight" href="/shop/skincare">
                        Store Locations
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="border-b border-gray-900 border-opacity-10 py-8 px-8 lg:px-40 flex items-center justify-between gap-8 flex-wrap">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between gap-8 flex-wrap">
          <div className="flex flex-wrap gap-8">
            {content.quickLinks.slice(0, 3).map((link) => (
              <a href={safeHref(link.href, '/clef-info')} key={`bottom-${link.label}-${link.href}`}>
                <span className="text-gray-800 text-sm hover:text-opacity-70 transition duration-20">{link.label}</span>
              </a>
            ))}
          </div>
          {content.logo ? (
            <Image
              src={content.logo.src}
              alt={content.logo.alt || 'CLEF'}
              width={content.logo.width ?? 100}
              height={content.logo.height ?? 54}
            />
          ) : null}
          <div className="flex flex-wrap justify-center gap-8">
            <img className="h-4" src="/coleos-assets/logos/logo-visa.svg" alt="Visa" />
            <img className="h-4" src="/coleos-assets/logos/logo-mastercard.svg" alt="Mastercard" />
            <img className="h-4" src="/coleos-assets/logos/logo-paypal.svg" alt="PayPal" />
          </div>
        </div>
      </div>
    </div>
    <div className="pt-7 pb-18">
      <div className="container px-4 mx-auto">
        <p className="text-gray-800 text-center text-sm">
          <span>{content.copyrightText}</span>
        </p>
      </div>
    </div>
  </footer>
  );
};

export default Footer;

