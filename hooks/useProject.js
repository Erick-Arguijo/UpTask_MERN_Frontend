import ProjectContext from "@/context/ProjectProvider"
import { useContext } from "react"

const useProject = () => {
  return useContext(ProjectContext)
}

export default useProject