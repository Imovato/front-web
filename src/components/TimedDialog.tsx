import { useState } from "react"

interface TimedDialogProps {
  timeout: number
  msg: string
  start: boolean
}

export function TimedDialog({timeout, msg, start}: TimedDialogProps) {
  const [cooldownWidth, setCooldownWidth] = useState(0)

  if(start)
    run()

  function run() {
    setTimeout(() => {
      setCooldownWidth(100)
    }, 10)
  }

  return <div style={{
    transition: 'opacity 0.5s',
    opacity: `${cooldownWidth / 100}`
  }} className="bg-green-100 rounded-t-none rounded-lg mb-5">
    <div style={{
      transition: `width linear ${timeout / 1000}s`,
      width: `${cooldownWidth}%`
    }}
    className="h-1 bg-green-500"></div>
    <div className="p-5">
      <p className="text-green-700 font-bold">{msg}</p>
    </div>
  </div>
}
