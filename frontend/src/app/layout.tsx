import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyles } from '@/styles/global'
import { ThemeClient } from '@/providers/ThemeClientProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <GlobalStyles />
        <StyledComponentsRegistry>
          <ThemeClient>{children}</ThemeClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
