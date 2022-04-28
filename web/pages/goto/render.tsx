import React, { useContext } from 'react'
import { SProps, IContext } from 'ssr-types-react'
import { STORE_CONTEXT } from '_build/create-context'

export default (props: SProps) => {
  const { state } = useContext<IContext<any>>(STORE_CONTEXT)

  return <div>goto {state.myApps}!</div>
}
