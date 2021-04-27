import { useEffect } from "react"
import { useHistory } from "react-router-dom"

export function Logout() {
  const history = useHistory()

  useEffect(() => {
    localStorage.removeItem('token')
    history.push('/')
  }, [])

  return (<></>)
}
