import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyles } from '@/styles/global'
import { ThemeClient } from '@/providers/ThemeClientProvider'

import { Nunito } from 'next/font/google'
import { Header } from '@/components/Header'
import { AnimalsContextClientProvider } from '@/providers/AnimalsContextClientProvider'

const nunitoFont = Nunito({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={nunitoFont.className}>
      <body>
        <StyledComponentsRegistry>
          <ThemeClient>
            <AnimalsContextClientProvider>
              <GlobalStyles />
              <Header />
              {children}
            </AnimalsContextClientProvider>
          </ThemeClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
