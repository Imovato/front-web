import { useState } from "react"

interface TimedDialogProps {
  timeout: number
  msg: string[]
  start: boolean
  dialogStyle?: string
}

export function TimedDialog({timeout, msg, dialogStyle = 'success', start}: TimedDialogProps) {
  const [cooldownWidth, setCooldownWidth] = useState(0)

  if(start)
    run()

  function run() {
    setTimeout(() => {
      setCooldownWidth(100)
    }, 10)
  }

  if(dialogStyle === 'error') {
    return (
    <div
    style={{
      transition: 'opacity 0.5s',
      opacity: `${cooldownWidth / 100}`}}
    className="bg-red-100 rounded-t-none rounded-lg mb-5"
    >
      <div
      style={{
        transition: `width linear ${timeout / 1000}s`,
        width: `${cooldownWidth}%`}}
      className="h-1 bg-red-500"></div>
      <div className="p-5">
        {msg.map((e: string, index) => (<p key={index} className="text-red-700 font-bold">{e}</p>))}
      </div>
    </div>
    )
  } else {
    return (
    <div
    style={{
      transition: 'opacity 0.5s',
      opacity: `${cooldownWidth / 100}`}}
    className="bg-green-100 rounded-t-none rounded-lg mb-5"
    >
      <div
      style={{
        transition: `width linear ${timeout / 1000}s`,
        width: `${cooldownWidth}%`}}
      className="h-1 bg-green-500"></div>
      <div className="p-5">
        {msg.map((e: string, index) => (<p key={index} className="text-green-700 font-bold">{e}</p>))}
      </div>
    </div>
    )
  }
}
