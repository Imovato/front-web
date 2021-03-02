import { useEffect } from "react"
import { useHistory } from "react-router-dom"

export function Logout() {
  const history = useHistory()

  useEffect(() => {
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userCpf')
    localStorage.removeItem('userPhone')
    localStorage.removeItem('userAddress')

    history.push('/')
  }, [])

  return (<></>)
}
