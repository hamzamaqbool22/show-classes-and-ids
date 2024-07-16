import { useEffect, useState } from "react"

import "~style.css"

import { extractFirstClassesAndIds } from "~utils"

function IndexPopup() {
  const [classes, setClasses] = useState<string>("No classes")
  const [id, setId] = useState<string>("No ID")
  const [message, setMessage] = useState<string>("")
  // get the class and id of the element from local storage
  // and set it to the state
  async function getClassesAndIds() {
    const storage = await chrome.storage.local.get()
    return storage
  }

  async function setClassesAndIds() {
    const elements = await getClassesAndIds()

    const { classes, id } = extractFirstClassesAndIds(elements)
    console.log(classes, id, "classes and id")
    setClasses(classes)
    setId(id)
  }

  useEffect(() => {
    setClassesAndIds()
  }, [])

  const copyClass = () => {
    navigator.clipboard.writeText(classes)
    setMessage("Copied to clipboard")
    // clear the local storage
    chrome.storage.local.clear()
  }
  const copyId = () => {
    navigator.clipboard.writeText(id)
    setMessage("Copied to clipboard")
    chrome.storage.local.clear()
  }
  // show message for 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("")
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="w-[200px] h-[200px] bg-white font-sans p-4">
      <h1 className="font-bold text-xl text-center">Copy Class or Id</h1>
      <div>
        <div>
          <label className="font-semibold text-lg text-center">Class:</label>
          <div className="w-full px-3 py-2 rounded-lg border mb-3 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            {classes}
          </div>
        </div>
        <div>
          <label className="font-semibold text-lg text-center">Id:</label>
          <div className="w-full px-3 py-2 rounded-lg border mb-3 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
            {id}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mb-2">
        <button
          onClick={copyClass}
          className="p-2 w-1/2 bg-blue-700 text-white rounded-full font-semibold">
          Copy Class
        </button>
        <button
          onClick={copyId}
          className="p-2 w-1/2 bg-blue-700 text-white rounded-full font-semibold">
          Copy Id
        </button>
      </div>
      <div>
        <p className="text-center text-blue-700 font-semibold">{message}</p>
      </div>
      <br />
    </div>
  )
}

export default IndexPopup
