import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import ContentScript from "~components/main"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return (
    <div className="relative left-full">
      <ContentScript />
    </div>
  )
}

export default PlasmoOverlay
