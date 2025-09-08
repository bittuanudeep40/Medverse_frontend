import * as React from "react"

// Define a breakpoint for mobile devices
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // Handler to check the screen width and update the state
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Check on initial mount
    checkScreenSize()

    // Add event listener for screen resize
    window.addEventListener("resize", checkScreenSize)

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return isMobile
}
