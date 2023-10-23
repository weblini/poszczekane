'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { FormEvent, useState } from "react"


export default function page() {
    const supabase = createClientComponentClient()

    const [newPass, setNewPass] = useState('')

    async function changePassword(e:FormEvent) {
        e.preventDefault()

        const {error} = await supabase.auth.updateUser({ password: newPass })
        
        console.log(error)
    }

  return (
    <form onSubmit={changePassword}>
        <input type="password" onChange={(e) => setNewPass(e.target.value)} value={newPass} className="input input-bordered"/>
        <button disabled={!newPass} className="btn btn-primary">Zmień hasło</button>
    </form>
  )
}