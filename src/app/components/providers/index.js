import { ThemeProvider } from "./theme-provider";

 

        


export default function Providers ({children}) {

  return (
    <ThemeProvider
      attribute="class"
      defaultTHeme="system"
      enableSystem
      disableTransitionOnChange
    >
        {children}
    </ThemeProvider>
  )

}
