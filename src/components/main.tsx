import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"

import { Storage } from "@plasmohq/storage"

const storage = new Storage({ area: "local" })

const ContentScript = () => {
  const [tooltip, setTooltip] = useState<{
    x: number
    y: number
    content: string
  } | null>(null)

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const classes = target.className
        ? `Classes: ${target.className}`
        : "No classes"
      const id = target.id ? `ID: ${target.id}` : "No ID"

      setTooltip({
        x: event.pageX + 10,
        y: event.pageY + 10,
        content: `${classes}<br>${id}`
      })
    }

    const handleMouseOut = () => {
      setTooltip(null)
    }

    const handleClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const classes = target.className || "No classes"
      const id = target.id || "No ID"
      const elementInfo = {
        classes: classes,
        id: id,
        timestamp: new Date().toISOString()
      }

      const savedElements: any = (await storage.get("savedElements")) || []
      savedElements?.push(elementInfo)
      await storage.set("savedElements", savedElements)
      console.log("Element saved:", elementInfo)
    }

    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mouseout", handleMouseOut)
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mouseout", handleMouseOut)
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return tooltip ? (
    <div
      style={{
        position: "absolute",
        left: `${tooltip.x}px`,
        top: `${tooltip.y}px`,
        backgroundColor: "#333",
        color: "#fff",
        padding: "5px",
        borderRadius: "5px",
        zIndex: 10000
      }}
      dangerouslySetInnerHTML={{ __html: tooltip.content }}
    />
  ) : null
}

const root = document.createElement("div")
document.body.appendChild(root)
createRoot(root).render(<ContentScript />)

export default ContentScript
